const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
 

const routes = require("./routes");

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api", routes);  

module.exports = app;