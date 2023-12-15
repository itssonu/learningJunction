const { body, validationResult } = require("express-validator");
const apiResponse = require("../apiResponse");
const User = require("../models/User");
const {
  createHashPassword,
  verifyPassword,
  createJwtToken,
} = require("../utils/authHelper");

exports.signup = async (req, res) => {
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
      message: "signup detail updated please verify your email for login",
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
      message: "signup successfully please verify your email for login",
    })(res);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return apiResponse({
      statusCode: 400,
      message: "email not found",
    })(res);
  }
  const userData = user.toJSON({ showPassword: true });
  const isPasswordValid = await verifyPassword(password, userData.password);
  if (!isPasswordValid) {
    return apiResponse({
      statusCode: 400,
      message: "email not found",
    })(res);
  }

  const token = createJwtToken(user.toJSON());
  return apiResponse({
    statusCode: 200,
    data: {
      token,
      userInfo: user,
    },
    message: "login successfully",
  })(res);
};
