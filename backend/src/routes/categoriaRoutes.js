const express = require("express");
const router = express.Router();

const {
  getAllCategoriasHandler,
  getCategoriaByIdHandler,
  addCategoriaHandler,
  updateCategoriaHandler,
  deleteCategoriaHandler
} = require("../controllers/categoriaController");

router.get("/", getAllCategoriasHandler);
router.get("/:id_categoria", getCategoriaByIdHandler);
router.post("/", addCategoriaHandler);
router.put("/:id_categoria", updateCategoriaHandler);
router.delete("/:id_categoria", deleteCategoriaHandler);

 

module.exports = router;
