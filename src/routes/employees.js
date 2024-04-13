const route = require("express").Router();
const employees = require("../controllers/employee");
const validator = require("../validation/validator");
const authenticate = require("../oauth/middleware");

route.get("/", employees.getAllEmployees);
route.get("/:id", employees.getEmployeeById);
route.delete("/:id", authenticate, employees.deleteEmployee);
route.post(
  "/",
  authenticate,
  validator.validateEmployee(),
  validator.validate,
  employees.createEmployee,
);
route.put(
  "/:id",
  authenticate,
  validator.validateEmployee(),
  validator.validate,
  employees.updateEmployee,
);

module.exports = route;
