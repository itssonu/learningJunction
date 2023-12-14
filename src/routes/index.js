const { signup, login } = require("../controllers/authController");
const { signupValidation, loginValidation } = require("../utils/validation");

const router = require("express").Router();
router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);

module.exports = (app) => {
  app.use("/api", router);

  app.use((req, res, next) => {
    res.status(404).json({ error: "Not Found" });
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message });
  });
};
