const { ObjectId } = require("mongodb");
const mongodb = require("../connection/db");

const getAllEmployees = async(req, res) => {
    const result = await mongodb
        .getDb()
        .db("carRental")
        .collection("employee")
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

const createEmployee = async(req, res) => {
    const employeeInfo = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        admission_date: req.body.admission_date,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
    };

    try {
        const result = await mongodb
            .getDb()
            .db("carRental")
            .collection("employee")
            .insertOne(employeeInfo);

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

const getEmployeeById = async(req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDb()
        .db("carRental")
        .collection("employee")
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

const deleteEmployee = async(req, res, next) => {
    const employeeId = new ObjectId(req.params.id);
    const response = await mongodb
        .getDb()
        .db("carRental")
        .collection("employee")
        .deleteOne({ _id: employeeId });
    console.log(response);

    try {
        if (response.deletedCount > 0) {
            res.status(200).json(`${employeeId} deleted successfully`);
        } else {
            res
                .status(500)
                .json(
                    response.error || "Some error occurred while deleting the contact.",
                );
        }
    } catch (error) {
        console.error("Error querying the database:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateEmployee = async(req, res, next) => {
    const employeeId = new ObjectId(req.params.id);

    const newEmployee = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        admission_date: req.body.admission_date,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
    };

    try {
        const result = await mongodb
            .getDb()
            .db("carRental")
            .collection("employee")
            .replaceOne({ _id: employeeId }, newEmployee);

        if (result.modifiedCount > 0) {
            res.status(204).json(`${employeeId} updated successfully`);
        } else {
            res
                .status(500)
                .json(
                    response.error || "Some error occurred while updating the contact.",
                );
        }
    } catch (error) {
        console.error("Error querying the database:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getAllEmployees,
    createEmployee,
    getEmployeeById,
    deleteEmployee,
    updateEmployee,
};