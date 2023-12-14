const { body, validationResult } = require("express-validator");
const apiResponse = require("../apiResponse");
const User = require("../models/User");
const { createHashPassword } = require("../utils/authHelper");

exports.signup = async (req, res) => {
  const error = validationResult(req).array({ onlyFirstError: true });

  if (error.length > 0) {
    return apiResponse({
      statusCode: 400,
      error: error,
      message: "validation failed",
      data: [],
    })(res);
  }

  const { firstName, lastName, email, password } = req.body;

  const existingEmailUser = await User.findOne({ email: email });
  const dbPassword = await createHashPassword(password);

  if (existingEmailUser && existingEmailUser.emailVerifiedAt !== null) {
    return apiResponse({
      statusCode: 400,
      data: [],
      message: "email allready registered please login",
    })(res);
  }
  const userData = {
    firstName,
    lastName,
    email,
    password: dbPassword,
  };

  if (existingEmailUser) {
    existingEmailUser.firstName = firstName;
    existingEmailUser.lastName = lastName;
    existingEmailUser.email = email;
    existingEmailUser.password = dbPassword;
    const updatedUser = await existingEmailUser.save();
    if (!updatedUser) {
      return apiResponse({
        statusCode: 400,
        data: [],
        message: "something went wrong",
      })(res);
    }
    return apiResponse({
      statusCode: 200,
      data: updatedUser,
      message: "signup successfully",
    })(res);
  } else {
    const newUser = new User(userData);
    const newUserSavedData = await newUser.save();
    if (!newUserSavedData) {
      return apiResponse({
        statusCode: 400,
        data: [],
        message: "failed to create account",
      })(res);
    }

    return apiResponse({
      statusCode: 200,
      data: newUserSavedData,
      message: "signup successfully",
    })(res);
  }
};

exports.signupValidationRule = [
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
];
