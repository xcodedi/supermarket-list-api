# Supermarket List API

## Introduction

This API aims to facilitate the management of items for a supermarket shopping list. With this API, you can add, update, view, and delete items from your shopping list.

## Dependencies and Technologies

To run the API, you need the following dependencies and technologies:

- [Docker](https://www.docker.com) - Containerization platform for developing, shipping, and running applications.
- [Node.js](https://nodejs.org) - JavaScript runtime environment.
- [Express](https://expressjs.com) - Web framework for Node.js.
- [MongoDB](https://www.mongodb.com) - Document-oriented NoSQL database.
- [Mongoose](https://mongoosejs.com) - Object Data Modeling (ODM) for MongoDB and Node.js.
- [Nodemon](https://nodemon.io) - Utility that monitors changes in files and automatically restarts the server.

## Steps to Run the Project

### Database Configuration

To configure the database, follow the steps below:

1. Create a MongoDB instance using Docker:

   docker run --name mongo-supermarket -p 27017:27017 -d mongo

## Running the Project

To run the project, follow these steps:

1. Git clone the repository:

   git clone https://github.com/xcodedi/supermarket-list-api.git

2. Navigate to the project folder and install dependencies:

   cd supermarket-list-api
   (npm install)

3. Run the project in development mode:

   npm run start:dev

4. Or run the project in production mode:

   npm run start

## Documentation

To test the API, use Insomnia to import the file below:
[Insomnia.json](https://github.com/xcodedi/supermarket-list-api/blob/main/Insomnia.json)

---
