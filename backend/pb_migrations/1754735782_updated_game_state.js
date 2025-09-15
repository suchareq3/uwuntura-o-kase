/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_69621308")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "select126723583",
    "maxSelect": 1,
    "name": "current_state",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "losowanie_pytania",
      "licytacja",
      "odpowiadanie",
      "kupowanie_podpowiedzi",
      "odpowiadanie_z_podpowiedzia"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_69621308")

  // remove field
  collection.fields.removeById("select126723583")

  return app.save(collection)
})
