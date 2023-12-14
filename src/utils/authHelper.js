const bcrypt = require("bcrypt");
const config = require("../config/index");
const jwt = require("jsonwebtoken");

const createHashPassword = async (plainPassword) => {
  const hashedPassword = await bcrypt.hash(
    plainPassword,
    config.auth.saltRound
  );
  return hashedPassword;
};

const verifyPassword = (plainPassword, dbPassword) => {
  return bcrypt.compare(plainPassword, dbPassword);
};

const createJwtToken = (user) => {
  const token = jwt.sign(user, config.jwt.secret, {
    algorithm: "HS256",
    expiresIn: config.jwt.expiry,
  });
  return token;
};

// const verifyToken = (user) => {
//   const token = jwt.sign(user, config.jwt.secret, {
//     algorithm: 'HS256', expiresIn: config.jwt.expiry
//   })
//   return token
// };

module.exports = {
  createHashPassword,
  verifyPassword,
  createJwtToken,
};
