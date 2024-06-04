const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  Name: { type: String, required: true },
  Description: { type: String, required: true },
});

const Category = mongoose.model("Category", categorySchema, "categories");
module.exports = Category;
