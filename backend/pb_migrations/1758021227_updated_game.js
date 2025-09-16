/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_69621308")

  // add field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "date3561997566",
    "max": "",
    "min": "",
    "name": "question_deadline",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "bool2306244601",
    "name": "timer_paused",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_69621308")

  // remove field
  collection.fields.removeById("date3561997566")

  // remove field
  collection.fields.removeById("bool2306244601")

  return app.save(collection)
})
