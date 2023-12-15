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
  try {
    const decodedToken = verify(token, config.jwt.secret);
    req.user = decodedToken;
  } catch (error) {
    return apiResponse({
      statusCode: 400,
      message: "token invalid",
    })(res);
  }
  return apiResponse({
    statusCode: 200,
    data: { userInfo: req.user },
    message: "token invalid",
  })(res);
};

module.exports = isAuth;
