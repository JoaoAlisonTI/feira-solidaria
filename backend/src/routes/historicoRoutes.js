const express = require('express');
const router = express.Router();
const historicoController = require('../controllers/historicoController');
const authMiddleware = require('../middlewares/authMiddleware');
console.log("DEBUG historicoController:", historicoController);

// Rota de teste
router.get('/ping', (req, res) => {
  res.json({ msg: "historicoRoutes funcionando!" });
});

// Rotas de histórico
router.get('/me', authMiddleware, historicoController.getMe);
router.get('/me/doacoes-feitas', authMiddleware, historicoController.getDoacoesFeitas);
router.get('/me/doacoes-recebidas', authMiddleware, historicoController.getDoacoesRecebidas);

module.exports = router;
