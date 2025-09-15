const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
  try{
    const { nome, email, senha, telefone} = req.body;

    if(!nome || !email || !senha){
      return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
    }

    const emailExists = await prisma.usuario.findUnique({
      where: { email : email }
    });

    if(emailExists){
      return res.status(400).json({ error: 'Email já está em uso.' });
    }

    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    const newUser = await prisma.usuario.create({
      data: {
        nome,
        email,
        senhaHash,
        telefone
      }
    });

    res.status(201).json({
      id: newUser.id,
      nome: newUser.nome,
      email: newUser.email
    });
  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar usuário.' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    const user = await prisma.usuario.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado.' });
    }

    const senhaValida = await bcrypt.compare(senha, user.senhaHash);
    if (!senhaValida) {
      return res.status(400).json({ error: 'Senha incorreta.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email }, // payload
      process.env.JWT_SECRET,             // chave secreta
      { expiresIn: '1d' }                 // expira em 1 dia
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer login.' });
  }
};

module.exports = {
  createUser,
  loginUser
};