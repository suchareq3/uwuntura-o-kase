/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_69621308")

  // update field
  collection.fields.addAt(5, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3292755704",
    "hidden": false,
    "id": "relation2603901931",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "current_category",
    "presentable": true,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_69621308")

  // update field
  collection.fields.addAt(5, new Field({
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

  return app.save(collection)
})
