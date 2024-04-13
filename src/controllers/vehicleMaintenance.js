const mongodb = require("../connection/db");
const ObjectId = require("mongodb").ObjectId;

// GET all maintenances from vahicleMaintenances collection
const getAll = async (req, res) => {
  const result = await mongodb
    .getDb()
    .db("carRental")
    .collection("vehicleMaintenances")
    .find();
  if (!result) {
    res.status(404).send({ message: "Collection not found" });
    return;
  } else {
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  }
};

// GET one specific maintenance from vahicleMaintenances collection
const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res
      .status(400)
      .json("Must use a valid Vehicle Maintenance ID to find a record.");
  }
  const maintenanceId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("carRental")
    .collection("vehicleMaintenances")
    .find({ _id: maintenanceId });
  result.toArray().then((lists) => {
    if (!lists) {
      res.status(404).send({ message: "Vehicle maintenance not found" });
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    }
  });
};

// CREATE a new vehicle maintenance
const createVehicleMaintenance = async (req, res, next) => {
  try {
    // const errors = validationResult(req);
    // if there is an error then return Error
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({
    //     success: false,
    //     errors: errors.array(),
    //   });
    // }

    const vehicleMaintenance = {
      vehicle: req.body.vehicle,
      date: req.body.date,
      mileage: req.body.mileage,
      lubrication: req.body.lubrication,
      brakes: req.body.brakes,
      tires: req.body.tires,
      suspension_system: req.body.suspension_system,
      disponibility: req.body.disponibility,
    };
    const response = await mongodb
      .getDb()
      .db("carRental")
      .collection("vehicleMaintenances")
      .insertOne(vehicleMaintenance);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error ||
            "Some error occurred while creating this vehicle amintenance record.",
        );
    }
  } catch (err) {
    next(err);
    //res.status(500).json(err);
  }
};

// UPDATE one vehicle maintenance
const updateMaintenance = async (req, res) => {
  try {
    const maintenanceId = new ObjectId(req.params.id);
    if (!maintenanceId) {
      res
        .status(400)
        .send({ message: "Invalid Vehicle Maintenance ID supplied" });
      return;
    }
    const vehicleMaintenance = {
      vehicle: req.body.vehicle,
      date: req.body.date,
      mileage: req.body.mileage,
      lubrication: req.body.lubrication,
      brakes: req.body.brakes,
      tires: req.body.tires,
      suspension_system: req.body.suspension_system,
      disponibility: req.body.disponibility,
    };
    const response = await mongodb
      .getDb()
      .db("carRental")
      .collection("vehicleMaintenances")
      .replaceOne({ _id: maintenanceId }, vehicleMaintenance);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error ||
            "Some error occurred while updating the vehicle maintenance.",
        );
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteMaintenance = async (req, res) => {
  try {
    const maintenanceId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db("carRental")
      .collection("vehicleMaintenances")
      .deleteOne({ _id: maintenanceId });
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error ||
            "Some error occurred while deleting this vehicle maintenance record.",
        );
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAll,
  getSingle,
  createVehicleMaintenance,
  updateMaintenance,
  deleteMaintenance,
};
