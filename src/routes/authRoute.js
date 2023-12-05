const {
  signupValidationRule,
  signup,
} = require("../controllers/authController");

module.exports = (app) => {
  app.post("/signup", signupValidationRule, signup);
};
