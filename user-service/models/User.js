const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  DateOfBirth: { type: Date, required: true },
  PhoneNumber: { type: String, required: true },
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: Date.now },
  Role: { type: Schema.Types.ObjectId, ref: "Role", required: true },
});

const User = mongoose.model("users", userSchema);
module.exports = User;
