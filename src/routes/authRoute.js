const { signupValidation, signup } = require("../controllers/authController");

signupValidation

module.exports = (app) => {
  app.post("/signup", signupValidation, signup);
};
