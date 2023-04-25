const { validationResult } = require("express-validator");
const UserService = require("../service/User.service");
const ApiErrors = require("../exceptions/Errors");

class UserController {
  async signup(req, res, next) {
    try {
      const validateErrors = validationResult(req);
      if (!validateErrors.isEmpty()) {
        next(ApiErrors.badRequest("kekw", validateErrors.array()));
      }
      const { email, password } = req.body;
      const data = await UserService.signup({ email, password, ...req.body });
      res.cookie("refreshToken", data.refreshToken, {
        maxAge: 30 * 24 * 3600 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const data = await UserService.login(email, password);
      res.cookie("refreshToken", data.refreshToken, {
        maxAge: 30 * 24 * 3600 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const data = await UserService.refresh(refreshToken);
      res.cookie("refreshToken", data.refreshToken, {
        maxAge: 30 * 24 * 3600 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await UserService.getAll();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
