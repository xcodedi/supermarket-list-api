require("dotenv").config(); // Loads environment variables from a .env file into process.env
const express = require("express"); // Imports the Express framework
const mongoose = require("mongoose"); // Imports the mongoose library for MongoDB
const routes = require("./src/routes"); // Imports the router from the src/routes file
const app = express(); // Creates a new instance of the Express application
const cors = require("cors"); // Imports the CORS middleware
const port = Number(process.env.PORT || 3333); // Defines the port number for the server to listen on, defaulting to 3333 if not specified in environment variables

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());
app.use(cors({ origin: "*" })); // Allows requests from any origin (CORS configuration)

// Function to connect to the MongoDB database
async function connectDatabase() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {}); // Connects to the MongoDB database using the connection string from environment variables
    console.log("Connected to database on port", port); // Logs a success message if the connection is established
  } catch (error) {
    console.error(`Error connecting to the database: ${error}`); // Logs an error message if the connection fails
  }
}

// Calls the connectDatabase function and adds routes to the application after establishing a connection to the database
connectDatabase().then(() => {
  app.use("/", routes); // Uses the imported router for handling routes
});

// Starts the server and listens for incoming requests on the specified port
app.listen(port, () => {
  console.log(`App is running on port ${port}`); // Logs a message when the server starts successfully
});

module.exports = app; // Exports the Express application instance
