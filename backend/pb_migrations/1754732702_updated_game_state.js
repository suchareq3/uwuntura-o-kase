/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_69621308")

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1568971955",
    "hidden": false,
    "id": "relation118580150",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "answering_team",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_69621308")

  // remove field
  collection.fields.removeById("relation118580150")

  return app.save(collection)
})
