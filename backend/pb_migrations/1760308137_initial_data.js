/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  // game
  let gameCollection = app.findCollectionByNameOrId("game");
  let gameRecord = new Record(gameCollection);
  gameRecord.set("id", "1");
  gameRecord.set("round", 1);
  gameRecord.set("status", "losowanie_kategorii");
  app.save(gameRecord);

  // teams
  let teamsCollection = app.findCollectionByNameOrId("teams");
  let teamsRecordMistrzowie = new Record(teamsCollection);
  teamsRecordMistrzowie.set("name", "mistrzowie");
  teamsRecordMistrzowie.set("amount", 12000); // ta kwote mozna edytowac dowolnie tbh
  teamsRecordMistrzowie.set("amount_given", 0);
  teamsRecordMistrzowie.set("active", true);
  app.save(teamsRecordMistrzowie);
  let teamsRecordZolci = new Record(teamsCollection);
  teamsRecordZolci.set("name", "zolci");
  teamsRecordZolci.set("amount", 5000);
  teamsRecordZolci.set("amount_given", 0);
  teamsRecordZolci.set("active", true);
  app.save(teamsRecordZolci);
  let teamsRecordZieloni = new Record(teamsCollection);
  teamsRecordZieloni.set("name", "zieloni");
  teamsRecordZieloni.set("amount", 5000);
  teamsRecordZieloni.set("amount_given", 0);
  teamsRecordZieloni.set("active", true);
  app.save(teamsRecordZieloni);
  let teamsRecordNiebiescy = new Record(teamsCollection);
  teamsRecordNiebiescy.set("name", "niebiescy");
  teamsRecordNiebiescy.set("amount", 5000);
  teamsRecordNiebiescy.set("amount_given", 0);
  teamsRecordNiebiescy.set("active", true);
  app.save(teamsRecordNiebiescy);
}, (app) => {
  // add down queries...
})
