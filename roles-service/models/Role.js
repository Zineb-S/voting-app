const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  IsAdmin: { type: Boolean, required: true },
});

const Role = mongoose.model("Role", roleSchema, "roles"); // Specify collection name as "roles"
module.exports = Role;
