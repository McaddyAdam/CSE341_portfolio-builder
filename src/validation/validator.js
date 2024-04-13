const validator = require("express-validator");

// -------- here you set the rule for your application
const validateEmployee = () => {
  return [
    validator.check("firstName", "Name is required").not().isEmpty(),
    validator.check("lastName", "Name is required").not().isEmpty(),
    validator
      .check("admission_date", "Admission date is required")
      .not()
      .isEmpty(),
    validator
      .check("phone", "Phone number is required and must be a number")
      .isNumeric(),
    validator
      .check("email", "Email is required")
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: true }),
    validator.check("address", "Address is required").not().isEmpty(),
  ];
};

const validateUser = () => {
  return [
    validator.check("firstName", "Name is required").not().isEmpty(),
    validator.check("lastName", "Name is required").not().isEmpty(),
    validator
      .check("phone", "Phone number is required and must be a number")
      .isNumeric(),
    validator
      .check("email", "Email is required")
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: true }),
    validator.check("address", "Address is required").not().isEmpty(),
  ];
};

const validateStore = () => {
  return [
    validator.check("address", "Address is required").not().isEmpty(),
    validator.check("email", "Email is required").isEmail(),
    validator
      .check("manager_name", "Manager Name  is required")
      .not()
      .isEmpty(),
    validator
      .check("phone_number", "Phone number is required and must be a number")
      .isNumeric(),
    validator.check("office_hours", "Office Hours is required").not().isEmpty(),
  ];
};

const validateVehicle = () => {
  return [
    validator.check("brand", "Brand is required").not().isEmpty(),
    validator.check("model", "Model is required").not().isEmpty(),
    validator.check("horse_power", "Horsepower is required").not().isEmpty(),
    validator.check("fuel_type", "Fuel Type is required").not().isEmpty(),
    validator.check("category", "Category is required").not().isEmpty(),
    validator.check("transmission", "Transmission is required").not().isEmpty(),
    validator
      .check("number_passenger", "The number of passenger is required")
      .not()
      .isEmpty(),
  ];
};

// --------------- Here you just put the validate function beside your rule above in the route you want to validate -------------

const validate = (req, res, next) => {
  const errors = validator.validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];

  errors.array().map((err) => {
    extractedErrors.push({
      [err.msg]: err.msg,
    });
  });

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  validate,
  validateEmployee,
  validateUser,
  validateStore,
  validateVehicle,
};
