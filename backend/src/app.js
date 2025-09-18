const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();


const routes = require("./routes");

// Middlewares
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173', // Permite requisições do frontend
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Métodos permitidos
}));

// Rotas
app.use("/api", routes);

module.exports = app;