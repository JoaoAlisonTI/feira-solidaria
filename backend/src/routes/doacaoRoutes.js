const express = require("express");
const router = express.Router();
const doacaoController = require("../controllers/doacaoController");

console.log("DEBUG doacaoController exportado:", doacaoController);
const authMiddleware = require("../middlewares/authMiddleware");

// rotas públicas
router.get("/", doacaoController.getDoacoes);  
router.get("/:id", doacaoController.getDoacaoById);
router.put("/:id", doacaoController.updateDoacao);
router.patch("/:id/concluir", doacaoController.concluirDoacao);

// rotas protegidas
router.post("/", authMiddleware, doacaoController.createDoacao);
router.put("/:id", authMiddleware, doacaoController.updateDoacao);

module.exports = router;