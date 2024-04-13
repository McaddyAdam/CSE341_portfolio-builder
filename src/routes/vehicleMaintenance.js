const express = require("express");
const router = express.Router();
const VMaintenanceController = require("../controllers/vehicleMaintenance");
const authenticate = require("../oauth/middleware");

router.get("/", VMaintenanceController.getAll);
router.get("/:id", VMaintenanceController.getSingle);
router.post("/", authenticate, VMaintenanceController.createVehicleMaintenance);
router.put("/:id", authenticate, VMaintenanceController.updateMaintenance);
router.delete("/:id", authenticate, VMaintenanceController.deleteMaintenance);

module.exports = router;
