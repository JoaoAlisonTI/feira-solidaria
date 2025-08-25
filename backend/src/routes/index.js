const express = require("express");
const router = express.Router();

const categoriaRoutes = require("./categoriaRoutes");
router.use("/categorias", categoriaRoutes);

module.exports = router;
