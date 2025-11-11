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
  teamsRecordMistrzowie.set("active", false);
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

  // categories
  let categoriesCollection = app.findCollectionByNameOrId("categories");
  let categoriesRecord1v1 = new Record(categoriesCollection);
  categoriesRecord1v1.set("name", "1v1");
  app.save(categoriesRecord1v1);
  let categoriesRecordPodpowiedz = new Record(categoriesCollection);
  categoriesRecordPodpowiedz.set("name", "Podpowiedz");
  app.save(categoriesRecordPodpowiedz);
  let categoriesRecordCzarnaSkrzynka = new Record(categoriesCollection);
  categoriesRecordCzarnaSkrzynka.set("name", "Czarna skrzynka");
  app.save(categoriesRecordCzarnaSkrzynka);
  let categoriesRecordCoToJest = new Record(categoriesCollection);
  categoriesRecordCoToJest.set("name", "Co to jest?");
  app.save(categoriesRecordCoToJest);

  let categoriesRecordKonwenty = new Record(categoriesCollection);
  categoriesRecordKonwenty.set("name", "Konwenty");
  app.save(categoriesRecordKonwenty);
  let categoriesRecordSeriale_i_anime = new Record(categoriesCollection);
  categoriesRecordSeriale_i_anime.set("name", "Seriale i anime");
  app.save(categoriesRecordSeriale_i_anime);
  let categoriesRecordTechnologie = new Record(categoriesCollection);
  categoriesRecordTechnologie.set("name", "Technologie");
  app.save(categoriesRecordTechnologie);
  let categoriesRecordJezykPolski = new Record(categoriesCollection);
  categoriesRecordJezykPolski.set("name", "Język polski");
  app.save(categoriesRecordJezykPolski);
  let categoriesRecordRozmaitosci = new Record(categoriesCollection);
  categoriesRecordRozmaitosci.set("name", "Rozmaitości");
  app.save(categoriesRecordRozmaitosci);
  let categoriesRecordMatematyka = new Record(categoriesCollection);
  categoriesRecordMatematyka.set("name", "Matematyka");
  app.save(categoriesRecordMatematyka);
  let categoriesRecordTworczoscWalaszka = new Record(categoriesCollection);
  categoriesRecordTworczoscWalaszka.set("name", "Tworczość Walaszka");
  app.save(categoriesRecordTworczoscWalaszka);
  let categoriesRecordCzasyWspolczesne = new Record(categoriesCollection);
  categoriesRecordCzasyWspolczesne.set("name", "Czasy współczesne");
  app.save(categoriesRecordCzasyWspolczesne);
  let categoriesRecordGeografia = new Record(categoriesCollection);
  categoriesRecordGeografia.set("name", "Geografia");
  app.save(categoriesRecordGeografia);
  let categoriesRecordWedkarstwo = new Record(categoriesCollection);
  categoriesRecordWedkarstwo.set("name", "Wędkarstwo");
  app.save(categoriesRecordWedkarstwo);
  
}, (app) => {
  // add down queries...
})
