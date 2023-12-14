const { body, validationResult } = require("express-validator");
const apiResponse = require("../apiResponse");

const validate = (req, res, next) => {
  const error = validationResult(req).array({ onlyFirstError: true });
  if (error.length > 0) {
    return apiResponse({
      statusCode: 400,
      error: error,
      message: "validation failed",
      data: [],
    })(res);
  }
  next();
};

exports.signupValidation = [
  body("firstName")
    .notEmpty()
    .trim()
    .withMessage("first name is required")
    .isLength({ max: 16 })
    .withMessage("first name should not more then 16"),

  // body("lastName").notEmpty().trim().withMessage("first name is required"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),

  // body("number")
  //   .notEmpty()
  //   .withMessage("Mobile number is required")
  //   .isMobilePhone()
  //   .withMessage("Invalid mobile number"),

  body("password")
    .notEmpty()
    .trim()
    .withMessage("password is required")
    .isLength({ min: 5 })
    .withMessage("password should not less then 5"),

  validate,
];

exports.loginValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),

  body("password").notEmpty().trim().withMessage("password is required"),

  validate,
];
