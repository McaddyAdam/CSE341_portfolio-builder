const mongodb = require("../connection/db.js");
const ObjectId = require("mongodb").ObjectId;

const getVehicle = async (req, res) => {
  try {
    const Db = await mongodb
      .getDb()
      .db("carRental")
      .collection("vehicles")
      .find()
      .toArray();
    res.status(200).json(Db);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving vehicles." });
  }
};

const getVehicleById = async (req, res) => {
  try {
    const vehicleId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db("carRental")
      .collection("vehicles")
      .find({ _id: vehicleId })
      .toArray();
    if (result.length === 0) {
      res.status(422).json({ error: `No vehicle found with ID: ${vehicleId}` });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the vehicle." });
  }
};

const createVehicle = async (req, res) => {
  try {
    const createVehicle = {
      brand: req.body.brand,
      model: req.body.model,
      horse_power: req.body.horse_power,
      fuel_type: req.body.fuel_type,
      category: req.body.category,
      transmission: req.body.transmission,
      number_passenger: req.body.number_passenger,
    };
    const result = await mongodb
      .getDb()
      .db("carRental")
      .collection("vehicles")
      .insertOne(createVehicle);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the vehicle." });
  }
};

const updateVehicleById = async (req, res) => {
  try {
    const vehicleId = new ObjectId(req.params.id);
    const updateVehicle = {
      brand: req.body.brand,
      model: req.body.model,
      horse_power: req.body.horse_power,
      fuel_type: req.body.fuel_type,
      category: req.body.category,
      transmission: req.body.transmission,
      number_passenger: req.body.number_passenger,
    };
    const result = await mongodb
      .getDb()
      .db("carRental")
      .collection("vehicles")
      .replaceOne({ _id: vehicleId }, updateVehicle);
    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(422).json({ error: `No vehicle found with ID: ${vehicleId}` });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the vehicle." });
  }
};

const deleteVehicleById = async (req, res) => {
  try {
    const vehicleId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db("carRental")
      .collection("vehicles")
      .deleteOne({ _id: vehicleId }, true);
    if (result.deletedCount > 0) {
      res.status(200).send("Vehicle was deleted from the database.");
    } else {
      res.status(422).json({ error: `No vehicle found with ID: ${vehicleId}` });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the vehicle." });
  }
};

module.exports = {
  getVehicle,
  getVehicleById,
  createVehicle,
  updateVehicleById,
  deleteVehicleById,
};
