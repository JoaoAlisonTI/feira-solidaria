const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");  

const {
  getAllCategoriasHandler,
  getCategoriaByIdHandler,
  addCategoriaHandler,
  updateCategoriaHandler,
  deleteCategoriaHandler
} = require("../controllers/categoriaController");

// Rotas públicas
router.get("/", getAllCategoriasHandler);
router.get("/:id_categoria", getCategoriaByIdHandler);

// Rotas protegidas
router.post("/", authMiddleware, addCategoriaHandler);  
router.put("/:id_categoria", authMiddleware, updateCategoriaHandler);
router.delete("/:id_categoria", authMiddleware, deleteCategoriaHandler);

module.exports = router;
