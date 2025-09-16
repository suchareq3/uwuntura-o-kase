// while "game" is in "licytacja" state, any changes to 'amount_given' reduce 'amount' and add to 'jackpot'.
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


// when "game" is set to "odpowiadanie":
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
    }
    e.next();
}, "game"); 

// Custom route to finish answering: moves jackpot conditionally and resets status to 'losowanie_kategorii'
routerAdd('POST', '/api/game/answer', (e) => {
  // Require admin auth to protect the endpoint (adjust if you use user auth instead)
  const correct = e.requestInfo().body.correct;
  $app.logger().info("correct: ", correct)

  $app.runInTransaction((txApp) => {
    const game = txApp.findRecordById('game', '1');

    // If correct, transfer jackpot to answering team
    if (correct) {
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
    game.set('timer_paused', false);
    game.set('question_deadline', null);
    txApp.save(game);
  });

  return e.json(200, { success: true });
});

// Custom route to start timer
routerAdd('POST', '/api/game/timer', (e) => {
  $app.runInTransaction((txApp) => {
    const game = txApp.findRecordById('game', '1');
    game.set("question_deadline", new Date(Date.now() + 60 * 1000));
    game.set("timer_paused", false);
    txApp.save(game);
  });
  return e.json(200, { success: true });
});
