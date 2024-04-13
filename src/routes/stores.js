const route = require("express").Router();
const stores = require("../controllers/stores");
const { validateStore, validate } = require("../validation/validator");
const authenticate = require("../oauth/middleware");

route.get("/", stores.getAllStores);
route.get("/:id", stores.getStoreById);
route.put("/:id", authenticate,  validateStore(), validate, stores.putStore);
route.post("/", authenticate, validateStore(), validate, stores.postStore);
route.delete("/:id", authenticate, stores.deleteStore);

module.exports = route;
