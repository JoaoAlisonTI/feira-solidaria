const express = require('express');
const router = express.Router();
const historicoController = require('../controllers/historicoController');
console.log("DEBUG historicoController:", historicoController);

// Rota de teste
router.get('/ping', (req, res) => {
  res.json({ msg: "historicoRoutes funcionando!" });
});

// Rotas de histórico
router.get('/me', historicoController.getMe);
router.get('/me/doacoes-feitas', historicoController.getDoacoesFeitas);
router.get('/me/doacoes-recebidas', historicoController.getDoacoesRecebidas);

module.exports = router;
