const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const path = require("path");


const routes = require("./routes");

// Middlewares
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173', // Permite requisições do frontend
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Métodos permitidos
}));

// Define que a pasta 'uploads' é pública e pode ser acessada pela rota /uploads
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

// Rotas
app.use("/api", routes);

module.exports = app;