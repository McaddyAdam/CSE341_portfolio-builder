const route = require("express").Router();
const users = require("../controllers/user");
const validator = require("../validation/validator");

const authenticate = require("../oauth/middleware");

route.get("/", users.getAllUsers);
route.get("/:id", users.getUserById);
route.delete("/:id", authenticate, users.deleteUser);

route.post(
  "/",
  authenticate,
  validator.validateUser(),
  validator.validate,

  users.createUser,
);
route.put(
  "/:id",
  authenticate,
  validator.validateUser(),
  validator.validate,
  users.updateUser,
);

module.exports = route;
