const express = require("express");
const mongoose = require("mongoose");
const routes = require("./src/routes"); // Importa o roteador
const app = express();
const port = 3333;

// Middleware para processar JSON
app.use(express.json());

async function connectDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/supermarket", {});
    console.log("Connected to database");
  } catch (error) {
    console.error(`Error connecting to the database: ${error}`);
  }
}

connectDatabase().then(() => {
  // Adiciona as rotas ao aplicativo após a conexão com o banco de dados ser estabelecida
  app.use("/", routes); // Usa o roteador exportado
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

module.exports = app;
