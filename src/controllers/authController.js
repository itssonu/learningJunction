const { body, validationResult } = require("express-validator");
const apiResponse = require("../apiResponse");

exports.signup = async (req, res) => {
  const error = validationResult(req).array({ onlyFirstError: true });
  console.log(error);
  if (error.length > 0) {
    return res.status(400).json(
      apiResponse({
        statusCode: 400,
        error: error,
        message: "validation failed",
        data: [],
      })
    );
  }
  
  return res.status(200).json(
    apiResponse({
      statusCode: 200,
      data: req.body,
      message: "signup successfully",
    })
  );
};

exports.signupValidationRule = [
  body("firstName")
    .notEmpty()
    .trim()
    .withMessage("first name is required")
    .isLength({ max: 16 })
    .withMessage("first name should not more then 16"),

  body("lastName").notEmpty().trim().withMessage("first name is required"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),

  body("mobileNumber")
    .notEmpty()
    .withMessage("Mobile number is required")
    .isMobilePhone()
    .withMessage("Invalid mobile number"),
];
