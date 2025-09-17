const express = require("express");
const router = express.Router();
const doacaoController = require("../controllers/doacaoController");
const authMiddleware = require("../middlewares/authMiddleware");

// rotas públicas  
router.get("/", doacaoController.getDoacoes);
router.get("/:id", doacaoController.getDoacaoById);

// rotas protegidas  
router.post("/", authMiddleware, doacaoController.createDoacao);
router.put("/:id", authMiddleware, doacaoController.updateDoacao);
router.patch("/:id/concluir", authMiddleware, doacaoController.concluirDoacao);

module.exports = router;
