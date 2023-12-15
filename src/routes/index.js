const { signup, login } = require("../controllers/authController");
const isAuth = require("../middelwares/isAuth");
const { signupValidation, loginValidation } = require("../utils/validation");
const express = require("express");

const basicRouter = express.Router();
basicRouter.post("/signup", signupValidation, signup);
basicRouter.post("/login", loginValidation, login);

const authRouter = express.Router();
authRouter.use(isAuth);
authRouter.get("/list", login);

module.exports = (app) => {
  app.use("/api", basicRouter);
  app.use("/api", authRouter);

  app.use((req, res, next) => {
    res.status(404).json({ error: "Not Found" });
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message });
  });
};
