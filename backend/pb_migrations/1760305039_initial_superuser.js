/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  let superusers = app.findCollectionByNameOrId("_superusers")

  let record = new Record(superusers)

  // note: the values can be eventually loaded via $os.getenv(key)
  // or from a special local config file
  record.set("email", "adminadmin@gmail.com")
  record.set("password", "adminadmin")

  app.save(record)
}, (app) => {
  // add down queries...
})
