const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Usuário fixo id=1 (simulação de login)
const USER_ID = 1;

const getMe = async (req, res) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: USER_ID }
    });
    if (!usuario) return res.status(404).json({ error: "Nenhum usuário encontrado" });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getDoacoesFeitas = async (req, res) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: USER_ID },
      include: {
        doacoesFeitas: {
          include: {
            categoria: true,
            receptor: true
          }
        }
      }
    });
    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });
    res.json(usuario.doacoesFeitas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getDoacoesRecebidas = async (req, res) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: USER_ID },
      include: {
        doacoesRecebidas: {
          include: {
            categoria: true,
            doador: true
          }
        }
      }
    });
    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });
    res.json(usuario.doacoesRecebidas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getMe, getDoacoesFeitas, getDoacoesRecebidas };
