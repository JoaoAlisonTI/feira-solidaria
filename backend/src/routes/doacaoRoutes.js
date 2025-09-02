const express = require("express");
const router = express.Router();

const doacaoController = require("../controllers/doacaoController");

router.post("/", doacaoController.createDoacao);
router.get("/", doacaoController.getDoacoes);
router.get("/:id", doacaoController.getDoacaoById);
router.put("/:id", doacaoController.updateDoacao);

module.exports = router;