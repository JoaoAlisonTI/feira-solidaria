const express = require("express");
const router = express.Router();

const doacaoController = require("../controllers/doacaoController");
console.log("DEBUG doacaoController exportado:", doacaoController);


router.post("/", doacaoController.createDoacao);
router.get("/", doacaoController.getDoacoes);
router.get("/:id", doacaoController.getDoacaoById);
router.put("/:id", doacaoController.updateDoacao);
router.patch("/:id/concluir", doacaoController.concluirDoacao);

module.exports = router;