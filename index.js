require("dotenv").config();
const express = require("express"); // Imports the Express framework
const mongoose = require("mongoose"); // Imports the mongoose library
const routes = require("./src/routes"); // Imports the router
const app = express(); // Creates a new instance of the Express application
const port = Number(process.env.PORT || 3333); // Defines the port number for the server to listen on

// Middleware to parse JSON
app.use(express.json());

// Function to connect to the MongoDB database
async function connectDatabase() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {}); // Connects to the MongoDB database
    console.log("Connected to database on port", port); // Logs a message if the connection is successful
  } catch (error) {
    console.error(`Error connecting to the database: ${error}`); // Logs an error message if the connection fails
  }
}

// Calls the connectDatabase function and adds routes to the application after establishing a connection to the database
connectDatabase().then(() => {
  app.use("/", routes); // Uses the exported router
});

// Starts the server and listens for incoming requests on the specified port
app.listen(port, () => {
  console.log(`App is running on port ${port}`); // Logs a message when the server starts successfully
});

module.exports = app; // Exports the Express application
