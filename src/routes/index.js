const express = require("express"); // Imports the Express framework
const router = express.Router(); // Creates a new router instance using Express
const ListItem = require("../models/listitem"); // Imports the ListItem model

// Defines a route to handle GET requests to the root path
router.get("/", (req, res) => {
  res.send("Hello World"); // Sends "Hello World" as the response
});

// Defines a route to handle GET requests to fetch all list items
router.get("/list-items", async (req, res) => {
  try {
    const { username } = req.headers; // Extract 'username' from request headers
    if (!username) {
      return res.status(401).json({ message: "user name is required" }); // Respond with a 401 status code if 'username' is missing
    }
    const items = await ListItem.find({ username }); // Retrieve all list items from the database for the given 'username'
    res.status(200).json(items); // Send the list items as JSON in the response with a 200 status code
  } catch (error) {
    // Catch any errors that occur during the operation
    return res
      .status(500)
      .json({ message: "Error fetching list items", error: error.message }); // Respond with a 500 status code and an error message
  }
});

// Defines a route to handle POST requests to create a new list item
router.post("/list-items", async (req, res) => {
  try {
    const { name, quantity, checked } = req.body; // Extracts name, quantity, and checked fields from the request body
    const { username } = req.headers; // Extracts 'username' from request headers

    // Validates the input
    if (!name || name.length < 3) {
      return res.status(400).json({
        message: "Name is mandatory and needs to be at least 3 characters long",
      }); // Sends an error response if the name is missing or too short
    }
    if (quantity === undefined || typeof quantity !== "number") {
      return res
        .status(400)
        .json({ message: "Quantity is mandatory and needs to be a number" }); // Sends an error response if the quantity is missing or not a number
    }

    // Creates a new list item
    const newItem = new ListItem({ name, quantity, checked, username });
    await newItem.save(); // Saves the new list item to the database

    res.status(201).json(newItem); // Sends the newly created list item as JSON in the response with all fields
  } catch (error) {
    // Catches any errors that occur during the operation
    return res
      .status(500)
      .json({ message: "Error creating list item", error: error.message }); // Sends an error message in case of failure
  }
});

// Defines a route to handle PUT requests to update an existing list item
router.put("/list-items/:id", async (req, res) => {
  try {
    const { name, quantity, checked } = req.body; // Extracts variables from the request body
    const itemId = req.params.id; // Extracts the item ID from the request parameters
    const { username } = req.headers; // Extracts 'username' from request headers

    const updatedItem = await ListItem.findByIdAndUpdate(
      // Finds and updates the list item in the database
      itemId,
      {
        name,
        quantity,
        checked: checked || false, // Sets the checked field to false if it's not provided
        username,
      },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" }); // Sends an error response if the item is not found
    }
    res.status(200).json(updatedItem); // Sends the updated list item as JSON in the response
  } catch (error) {
    // Catches any errors that occur during the operation
    return res
      .status(500)
      .json({ message: "Error updating list item", error: error.message }); // Sends an error message in case of failure
  }
});

// Defines a route to handle DELETE requests to delete an existing list item
router.delete("/list-items/:id", async (req, res) => {
  try {
    const itemId = req.params.id; // Extracts the item ID from the request parameters
    const deletedItem = await ListItem.findByIdAndDelete(itemId); // Finds and deletes the list item from the database
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" }); // Sends an error response if the item is not found
    }
    res.status(200).json({ message: "Item deleted successfully" }); // Sends a success message in the response
  } catch (error) {
    // Catches any errors that occur during the operation
    return res
      .status(500)
      .json({ message: "Error deleting list item", error: error.message }); // Sends an error message in case of failure
  }
});

module.exports = router; // Exports the router to be used by other modules
