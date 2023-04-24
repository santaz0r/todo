const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  manager: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("User", UserSchema);
