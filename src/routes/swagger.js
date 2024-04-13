const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("../../swagger/swagger.json");

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerDoc));

module.exports = router;
