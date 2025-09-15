const express = require("express");
const router = express.Router();

const categoriaRoutes = require("./categoriaRoutes");
const userRoutes = require("./userRoutes");
const doacaoRoutes = require("./doacaoRoutes");
const historicoRoutes = require("./historicoRoutes");
 

router.use("/categorias", categoriaRoutes);
router.use("/usuarios", userRoutes);
router.use("/usuarios", historicoRoutes);
router.use("/doacoes", doacaoRoutes);

module.exports = router;