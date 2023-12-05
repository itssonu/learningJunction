const { body, validationResult } = require("express-validator");
const apiResponse = require("../apiResponse");

exports.signup = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json(
      apiResponse({
        statusCode: 400,
        error: error.errors,
        message: "validation failed",
        data: [],
      })
    );
    // return res.send('validation failed')
  }
  res.send("sigggggggg failed");
};

exports.signupValidation = [
  body("firstName")
    .notEmpty()
    .trim()
    .withMessage("first name is required")

    .isLength({ max: 16 })
    .withMessage("first name should not more then 16"),

  // .isLength({ min: 1 })
  // .withMessage("first name should not less then 1")
  body("lastName").notEmpty().trim().withMessage("first name is required"),
];
