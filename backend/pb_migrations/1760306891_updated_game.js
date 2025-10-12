/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_69621308")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "select126723583",
    "maxSelect": 1,
    "name": "status",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "losowanie_pytania",
      "losowanie_kategorii",
      "licytacja",
      "odpowiadanie",
      "1v1",
      "1v1_odpowiadanie"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_69621308")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "select126723583",
    "maxSelect": 1,
    "name": "status",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "losowanie_pytania",
      "losowanie_kategorii",
      "licytacja",
      "odpowiadanie",
      "kupowanie_podpowiedzi",
      "odpowiadanie_z_podpowiedzia",
      "1v1",
      "1v1_odpowiadanie"
    ]
  }))

  return app.save(collection)
})
