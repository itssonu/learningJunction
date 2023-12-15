const { verify } = require("jsonwebtoken");
const apiResponse = require("../apiResponse");
const config = require("../config");

const isAuth = (req, res, next) => {
  let token = req.headers.authorization ?? "";
  token = token.slice(7);
  if (!token) {
    return apiResponse({
      statusCode: 400,
      message: "Token Required",
    })(res);
  }
  const isTokenValid = verify(token, config.jwt.secret);
  return apiResponse({
    statusCode: 400,
    message: isTokenValid,
  })(res);
};

module.exports = isAuth;
