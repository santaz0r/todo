const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const TokenService = require("./Token.service");
const UserDto = require("../dtos/user.dto");

class Userservice {
  async signup(email, password) {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error(`email ${email} already exist`);
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await UserModel.create({ email, password: hashedPassword });

    const userDto = new UserDto(newUser);
    const tokens = TokenService.generate({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}

module.exports = new Userservice();
