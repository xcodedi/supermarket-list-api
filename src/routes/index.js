const express = require("express");
const router = express.Router();
const ListItem = require("../models/listitem");

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.get("/list-items", async (req, res) => {
  try {
    const items = await ListItem.find();
    res.status(200).json(items);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching list items", error: error.message });
  }
});

router.post("/list-items", async (req, res) => {
  try {
    const { name, quantity, checked } = req.body;

    // Validate the input
    if (!name || name.length < 3) {
      return res.status(400).json({
        message: "Name is mandatory and needs to be at least 3 characters long",
      });
    }
    if (quantity === undefined || typeof quantity !== "number") {
      return res
        .status(400)
        .json({ message: "Quantity is mandatory and needs to be a number" });
    }

    // Create new list item
    const newItem = new ListItem({ name, quantity, checked });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating list item", error: error.message });
  }
});

router.put("/list-items/:id", async (req, res) => {
  try {
    const { name, quantity, checked } = req.body; // Extracting variables from req.body
    const itemId = req.params.id;
    const updatedItem = await ListItem.findByIdAndUpdate(
      itemId,
      {
        name,
        quantity,
        checked: checked || false,
      },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating list item", error: error.message });
  }
});

router.delete("/list-items/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const deletedItem = await ListItem.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting list item", error: error.message });
  }
});

module.exports = router;
