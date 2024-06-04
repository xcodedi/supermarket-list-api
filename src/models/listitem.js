const mongoose = require("mongoose");

// Define a schema for the list item model
const listitemSchema = new mongoose.Schema({
  name: String, // Define the name field as a string
  quantity: Number, // Define the quantity field as a number
  checked: Boolean, // Define the checked field as a boolean
});

// Export the model using the schema, with the name "list_item"
module.exports = mongoose.model("list_item", listitemSchema);
