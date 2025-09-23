const express = require("express");
const router = express.Router();
const multer = require('multer'); // 1. IMPORTAR O MULTER

// Importa suas ferramentas
const doacaoController = require("../controllers/doacaoController");
const authMiddleware = require("../middlewares/authMiddleware");
const multerConfig = require('../config/multer'); // 2. IMPORTAR A CONFIGURAÇÃO DO MULTER

// Cria uma instância do multer com a sua configuração
const upload = multer(multerConfig);

// --- Rotas Públicas ---
router.get("/", doacaoController.getDoacoes);
router.get("/:id", doacaoController.getDoacaoById);

// --- Rotas Protegidas ---

router.post("/", authMiddleware, upload.single('imagem'), doacaoController.createDoacao);

router.put("/:id", authMiddleware, doacaoController.updateDoacao);
router.patch("/:id/concluir", authMiddleware, doacaoController.concluirDoacao);
router.patch("/:id/reservar", authMiddleware, doacaoController.reservarDoacao);
router.patch("/:id/relistar", authMiddleware, doacaoController.relistarDoacao);

module.exports = router;