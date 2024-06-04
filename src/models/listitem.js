const mongoose = require("mongoose");

const listitemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  checked: Boolean,
});

module.exports = mongoose.model("list_item", listitemSchema);
