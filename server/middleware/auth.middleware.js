const ApiErrors = require("../exceptions/Errors");
const TokenService = require("../service/Token.service");

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(ApiErrors.unAuthErr());
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return next(ApiErrors.unAuthErr());
    }

    const data = TokenService.validateAccessToken(token);
    if (!data) {
      return next(ApiErrors.unAuthErr());
    }

    req.user = data;
    next();
  } catch (error) {
    return next(ApiErrors.unAuthErr());
  }
};
