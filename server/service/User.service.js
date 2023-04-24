const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const TokenService = require("./Token.service");
const UserDto = require("../dtos/user.dto");
const ApiErrors = require("../exceptions/Errors");
const User = require("../models/User");

class Userservice {
  async signup({ email, password, ...rest }) {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw ApiErrors.badRequest(`email ${email} already exist`);
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      ...rest,
    });
    const userDto = new UserDto(newUser);
    const tokens = TokenService.generate({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async login(email, password) {
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      throw ApiErrors.badRequest(`email ${email} doesn't exist`);
    }

    const isPassEqual = await bcrypt.compare(password, existingUser.password);

    if (!isPassEqual) {
      throw ApiErrors.badRequest(`incorrect email or password`);
    }
    const userDto = new UserDto(existingUser);
    const tokens = TokenService.generate({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiErrors.unAuthErr();
    }
    const data = TokenService.validateRefreshToken(refreshToken);
    const tokenDB = await TokenService.findToken(refreshToken);

    if (!data || !tokenDB) {
      throw ApiErrors.unAuthErr();
    }
    const user = await User.findById(data.id);
    const userDto = new UserDto(user);
    const tokens = TokenService.generate({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getAll() {
    const users = await User.find();
    return users;
  }
}

module.exports = new Userservice();
