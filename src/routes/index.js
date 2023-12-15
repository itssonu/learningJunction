const { signup, login } = require("../controllers/authController");
const isAuth = require("../middelwares/isAuth");
const { signupValidation, loginValidation } = require("../utils/validation");
const express = require("express");

const router = express.Router();
router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);

router.use(isAuth);
router.get("/list", login);

module.exports = (app) => {
  app.use("/api", router);

  app.use((req, res, next) => {
    res.status(404).json({ error: "Not Found" });
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message });
  });
};
