const UserService = require("../service/User.service");

class UserController {
  async signup(req, res, next) {
    try {
      const { email, password } = req.body;
      const data = await UserService.signup(email, password);
      res.cookie("refreshToken", data.refreshToken, {
        maxAge: 30 * 24 * 3600 * 1000,
        httpOnly: true,
      });

      return res.json(data);
    } catch (e) {
      console.log(e);
    }
  }

  async login(req, res, next) {
    try {
    } catch (e) {}
  }

  async logout(req, res, next) {
    try {
    } catch (e) {}
  }

  async refreshToken(req, res, next) {
    try {
    } catch (e) {}
  }

  async getUsers(req, res, next) {
    try {
      res.json(["kekw", "lulc"]);
    } catch (e) {}
  }
}

module.exports = new UserController();
