const express = require("express");
const router = express.Router();

const categoriaRoutes = require("./categoriaRoutes");
const userRoutes = require("./userRoutes");
const doacaoRoutes = require("./doacaoRoutes");

router.use("/categorias", categoriaRoutes);
router.use("/usuarios", userRoutes);
router.use("/doacoes", doacaoRoutes);

module.exports = router;