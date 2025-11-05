/// <reference path="../pb_data/types.d.ts" />
// while "game" status is "licytacja", any changes to 'amount_given' reduce 'amount' and add to 'jackpot'.
onRecordUpdateExecute((e) => {
    $app.runInTransaction(txApp => {
        const game = txApp.findRecordById("game", "1");
        if (game.get("status") == "licytacja") {
            const oldGiven = Number(e.record.original().get("amount_given") || 0);
            const newGiven = Number(e.record.get("amount_given") || 0);
            const delta = newGiven - oldGiven;
            game.set("jackpot+", delta);
            txApp.save(game);

            e.record.set("amount-", delta);
        }
    });
    e.next();
}, "teams");


// when "game" round increases:
// 1. check each team's amount. if team's amount is less than 300, set team's active to false
// 2. check game round. if it's 7, then:
//      a) deactivate all teams except for the one with the highest amount (BESIDES mistrzowie)
//      b) activate "mistrzowie"
//      c) deactivate "podpowiedz" and "co to jest?", activate "1v1" and "czarna skrzynka" categories
        
onRecordAfterUpdateSuccess((e) => {
    if (e.record.original().get("round") < e.record.get("round")) {
        $app.runInTransaction(txApp => {
            const teams = txApp.findAllRecords("teams");
            teams.forEach((team) => {
                if (team.get("amount") < 300) {
                    team.set("active", false);
                    txApp.save(team);
                }
            });
        });

        $app.logger().info("round: ", e.record.get("round"));
        if (e.record.original().get("round") == 6 && e.record.get("round") == 7) {
            $app.runInTransaction(txApp => {
                // find the 2 teams w/ lowest amount (out of 3, disregarding mistrzowie) then deactivate them
                const lowestTeams = txApp.findRecordsByFilter(
                    "teams",
                    "active = true && name != 'mistrzowie'",
                    "+amount",
                    2,
                    0
                );
                lowestTeams.forEach((team) => {
                    team.set("active", false);
                    txApp.save(team);
                    $app.logger().info("lowest team ", team.get("name"), team.get("amount"));
                });

                // activate mistrzowie
                const mistrzowie = txApp.findFirstRecordByData("teams", "name", "mistrzowie");
                mistrzowie.set("active", true);
                txApp.save(mistrzowie);
                $app.logger().info("mistrzowie ", mistrzowie.get("name"), mistrzowie.get("amount"));

                // deactivate "podpowiedz" and "co to jest?", activate "1v1" and "czarna skrzynka" categories
                const categories = txApp.findAllRecords("categories");
                categories.forEach((category) => {
                    if (category.get("name").toLowerCase() == "podpowiedz" || category.get("name").toLowerCase() == "co to jest?") {
                        category.set("active", false);
                        txApp.save(category);
                        $app.logger().info("podpowiedz/cotojest: ", category.get("name"))
                    } else if (category.get("name").toLowerCase() == "1v1" || category.get("name").toLowerCase() == "czarna skrzynka") {
                        category.set("active", true);
                        txApp.save(category);
                        $app.logger().info("1v1/czarnaskrzynka: ", category.get("name"))
                    }
                });
                
            });
        }
    }
    e.next();
}, "game");


// when "game" status is changed from "losowanie_kategorii" to "licytacja"
// add 200 to each active team's "amount_given" (which, combined with other events, will reduce "amount" and add to "jackpot")
onRecordAfterUpdateSuccess((e) => {
    if (e.record.original().get("status") == "losowanie_kategorii" && e.record.get("status") == "licytacja") {
        $app.runInTransaction(txApp => {
            const teams = txApp.findRecordsByFilter(
                "teams",
                "active = true",
                "",
                0,
                0
            );
            teams.forEach((team) => {
                team.set("amount_given+", 200);
                txApp.save(team);
            });
        });
    }

    e.next();
}, "game");


// when "game" status is changed from "licytacja" to "odpowiadanie":
// 1. pick the team with the highest amount_given as the answering team
// 2. amount_given is reset to 0 for all teams (without transferring to 'amount'/'jackpot'!)
// 3. get random (unused) question and assign it to "current_question"
onRecordAfterUpdateSuccess((e) => {
    if (e.record.original().get("status") == "licytacja" && e.record.get("status") == "odpowiadanie" &&
        // this check prevents recursively using up all questions at once:
        e.record.get("current_question") == "") {
    
        
        $app.runInTransaction(txApp => {
            const teams = txApp.findAllRecords("teams");

            if (e.record.get("answering_team") == "") {
                let winnerId = "";
                let maxGiven = 0;
                teams.forEach((team) => {
                        const given = Number(team.get("amount_given") || 0);
                        if (given > maxGiven) {
                            maxGiven = given;
                            winnerId = team.get("id");
                        }
                    });
                    if (maxGiven > 0 && winnerId) {
                        e.record.set("answering_team", winnerId);
                        txApp.save(e.record);
                    }
                }
        })
            
        $app.runInTransaction(txApp => { 
            const currentCategory = e.record.get("current_category");
            const results = txApp.findRecordsByFilter(
                "questions",
                `used = false && category = '${currentCategory}'`,
                "@random",
                1,
                0
            );
            const randomQuestion = results && results[0];
            if (randomQuestion) {                
                randomQuestion.set("used", true);
                txApp.save(randomQuestion);
                e.record.set("current_question", randomQuestion.get("id"));
                txApp.save(e.record);
            }
        });

        $app.runInTransaction(txApp => {
            const teams = txApp.findAllRecords("teams");
            teams.forEach((team) => {
                $app.logger().info("teaam amount before " + team.get("amount_given") + " " + team.get("name"));
                team.set("amount_given", 0);
                txApp.save(team);
                $app.logger().info("teaam amount after " + team.get("amount_given") + " " + team.get("name"));
            });
        });

        $app.runInTransaction(txApp => {
            if (e.record.get("has_vabanqued") === true) {
                e.record.set("has_vabanqued", false);
                txApp.save(e.record);
            }
        });
    }
    e.next();
}, "game"); 


// TODO: add extra check for round>6 (mistrzowie become active)
// when "game" status is set to "1v1" :
// 1. grab 200 from each active team's "amount" and add to jackpot
// 2. randomly pick 7 categories, then assign them to "1v1_available_categories"
// 3. set "1v1_selected_categories" to an empty array
// 4. ???
onRecordAfterUpdateSuccess((e) => {
    if (e.record.original().get("status") == "losowanie_kategorii" && e.record.get("status") == "1v1" 
    // this check prevents an infinite loop:
    && e.record.get("1v1_available_categories").length == 0) {
        $app.logger().info("1v1 started");
        $app.runInTransaction(txApp => {
            // 1. grab 200 from each active team's "amount" and add to jackpot
            const teams = txApp.findRecordsByFilter(
                "teams",
                "active = true",
                "",
                0,
                0
            );
            teams.forEach((team) => {
                team.set("amount-", 200);
                txApp.save(team);
            });
            e.record.set("jackpot+", 200 * teams.length);
            $app.logger().info("1v1 jackpot: " + e.record.get("jackpot"));
            //txApp.save(e.record);

            // 2. randomly pick 7 categories, then assign them to "1v1_available_categories"
            const categories = txApp.findRecordsByFilter(
                "categories",
                "name != '1v1'",
                "@random",
                7,
                0
            );
            const categoryIds = categories.map(c => c.get("id"));
            e.record.set("1v1_available_categories", categoryIds);
            $app.logger().info("1v1 available categories: " + JSON.stringify(categories));
            //txApp.save(e.record);

            // 3. set "1v1_selected_categories" to an empty array
            e.record.set("1v1_selected_categories", []);
            $app.logger().info("1v1 selected categories: " + e.record.get("1v1_selected_categories"));
            txApp.save(e.record);
            $app.logger().info("1v1 finished");
            $app.logger().info("1v1 after:", e.record);
        });
    }
    e.next();
}, "game");


// when "game" status is changed from "1v1" to "odpowiadanie":
// 1. grab 1v1_available_categories & 1v1_selected_categories
// 2. find the missing category from 1v1_available_categories
// 3. assign it to "current_category"
// 4. find a random unused question from the missing category
// 5. assign it to "current_question"
onRecordAfterUpdateSuccess((e) => {
    if (e.record.original().get("status") == "1v1" && e.record.get("status") == "odpowiadanie") {
        $app.runInTransaction(txApp => {
            const availableCategories = e.record.get("1v1_available_categories");
            const selectedCategories = e.record.get("1v1_selected_categories");
            const missingCategory = availableCategories.find(c => !selectedCategories.includes(c));
            e.record.set("current_category", missingCategory);
            $app.logger().info("1v1 missing category: ", JSON.stringify(missingCategory));
            const results = txApp.findRecordsByFilter(
                "questions",
                `used = false && category = '${missingCategory}'`,
                "@random",
                1,
                0
            );
            const randomQuestion = results && results[0];
            if (randomQuestion) {                
                randomQuestion.set("used", true);
                txApp.save(randomQuestion);
                e.record.set("current_question", randomQuestion.get("id"));
                txApp.save(e.record);
            }
        });
        $app.logger().info("1v1 odp finished");
        $app.logger().info("1v1 odp after:", e.record);
    }
    e.next();
}, "game");



// Custom route to finish answering: 
// -moves jackpot conditionally
// -sets round+1
// -sets status back to 'losowanie_kategorii'
// -resets other game fields
routerAdd('POST', '/api/game/answer', (e) => {

  $app.runInTransaction((txApp) => {
    const game = txApp.findRecordById('game', '1');

    const isCorrect = e.requestInfo().body.correct;
    if (isCorrect) {
        const answeringTeamId = game.get('answering_team');
        const jackpot = Number(game.get('jackpot') || 0);
        if (answeringTeamId && jackpot > 0) {
            const team = txApp.findRecordById('teams', answeringTeamId);
            team.set('amount+', jackpot);
            txApp.save(team);
            game.set('jackpot', 0);
        }
    }

    // Reset game state back to category draw
    game.set('status', 'losowanie_kategorii');
    game.set('round+', 1);
    game.set('answering_team', '');
    game.set('current_question', '');
    game.set('current_category', '');
    game.set('hint_purchased', false);
    game.set('question_deadline', null);
    game.set('1v1_available_categories', []);
    game.set('1v1_selected_categories', []);
    txApp.save(game);
  });

  return e.json(200, { success: true });
});

// Custom route to start timer
routerAdd('POST', '/api/game/timer', (e) => {
  $app.runInTransaction((txApp) => {
    const game = txApp.findRecordById('game', '1');
    game.set("question_deadline", new Date(Date.now() + 60 * 1000));
    txApp.save(game);
  });
  return e.json(200, { success: true });
});

// Custom route to handle auctioning czarna skrzynka or odpowiedz:
// 1. change game status back to 'losowanie_kategorii'
// 2. amount_given is reset to 0 for all teams (without transferring to 'amount'/'jackpot'!)
routerAdd('POST', '/api/game/skip_round', (e) => {
  $app.runInTransaction((txApp) => {
    const game = txApp.findRecordById('game', '1');
    game.set("status", "losowanie_kategorii");
    txApp.save(game);

    const teams = txApp.findAllRecords("teams");
    teams.forEach((team) => {
        team.set("amount_given", 0);
        txApp.save(team);
    });
  });
  return e.json(200, { success: true });
});