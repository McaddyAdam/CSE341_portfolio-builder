const swaggerAutogen = require("swagger-autogen");

const doc = {
    info: {
        title: "Rental Cars",
        description: "This API is designed to manage and organize data within five key collections: Users, Vehicles, Vehicle Maintenance,Employees and Stores ",
    },
    host: "http://localhost:7070",
    schemes: ["http"],
};
const outputFile = "./swagger.json";
const endpointsFiles = ["./src/routes/index.js"];
// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);