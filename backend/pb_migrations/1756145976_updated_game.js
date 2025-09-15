/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_69621308")

  // add field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3292755704",
    "hidden": false,
    "id": "relation2603901931",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "current_category",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_4009210445",
    "hidden": false,
    "id": "relation730805092",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "current_question",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_69621308")

  // remove field
  collection.fields.removeById("relation2603901931")

  // remove field
  collection.fields.removeById("relation730805092")

  return app.save(collection)
})
