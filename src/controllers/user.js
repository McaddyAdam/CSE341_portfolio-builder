const { ObjectId } = require("mongodb");
const mongodb = require("../connection/db");

const getAllUsers = async (req, res) => {
  const result = await mongodb
    .getDb()
    .db("carRental")
    .collection("users")
    .find()
    .toArray();

  try {
    if (result.length !== 0) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result);
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(400).json("Not Found");
    }
  } catch (error) {
    console.log("Error querying the database:", error);
    res.status(500).json({ message: "internal server error" });
  }
};

const createUser = async (req, res) => {
  const userInfo = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
  };

  try {
    const result = await mongodb
      .getDb()
      .db("carRental")
      .collection("users")
      .insertOne(userInfo);

    if (result.acknowledged) {
      res.setHeader("Content-Type", "application/json");

      res.status(201).json(result.insertedId + " added to the database");
    } else {
      res.status(400).json({ message: "no data found" });
    }
  } catch (error) {
    console.log("Error querying the database:", error);
    res.status(500).json({ message: "internal server error" });
  }
};

const getUserById = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("carRental")
    .collection("users")
    .findOne({ _id: userId });

  try {
    if (result.length === 0) {
      res.status(404).json({ message: "No data found" });
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result);
    }
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res, next) => {
  const employeeId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db("carRental")
    .collection("users")
    .deleteOne({ _id: employeeId });
  // console.log(response);

  try {
    if (response.deletedCount > 0) {
      res.status(200).json(`${employeeId} was deleted successfully`);
    } else {
      res
        .status(500)
        .json(
          response.error || "An error occurred while deleting the contact.",
        );
    }
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);

  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
  };

  try {
    const result = await mongodb
      .getDb()
      .db("carRental")
      .collection("users")
      .replaceOne({ _id: userId }, newUser);

    if (result.modifiedCount > 0) {
      res.status(204).json(`${userId} was updated successfully`);
    } else {
      res
        .status(500)
        .json(
          response.error || "An error occurred while updating the contact.",
        );
    }
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
};
