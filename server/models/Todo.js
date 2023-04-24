const { Schema, model } = require("mongoose");

const TodoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  created: { type: String, required: true },
  deadline: { type: String, required: true },
  priority: { type: String, required: true },
  status: { type: String, required: true },
  responsible: { type: Schema.Types.ObjectId, ref: "User" },
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Todo", TodoSchema);
