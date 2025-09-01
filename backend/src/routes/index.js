const express = require("express");
const router = express.Router();

const categoriaRoutes = require("./categoriaRoutes");
const userRoutes = require("./userRoutes");
router.use("/categorias", categoriaRoutes);
router.use("/usuarios", userRoutes);

module.exports = router;
