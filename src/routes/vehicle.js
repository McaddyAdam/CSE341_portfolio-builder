const router = require("express").Router();

const controllerVehicle = require("../controllers/vehicle");

const validator = require("../validation/validator");

const authenticate = require("../oauth/middleware");

router.get("/", controllerVehicle.getVehicle);

router.get("/:id", controllerVehicle.getVehicleById);

router.post(
  "/",
  authenticate,

  validator.validateVehicle(),
  validator.validate,
  controllerVehicle.createVehicle,
);

router.put(
  "/:id",
  authenticate,
  validator.validateVehicle(),
  validator.validate,
  controllerVehicle.updateVehicleById,
);

router.delete("/:id", authenticate, controllerVehicle.deleteVehicleById);

module.exports = router;
