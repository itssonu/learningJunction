const { signup } = require("../controllers/authController");
const { signupValidation } = require("../utils/validation");

module.exports = (app) => {
  app.post("/signup", signupValidation, signup);
};
