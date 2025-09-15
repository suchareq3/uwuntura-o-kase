/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_69621308")

  // update collection data
  unmarshal({
    "name": "game_state"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_69621308")

  // update collection data
  unmarshal({
    "name": "game"
  }, collection)

  return app.save(collection)
})
