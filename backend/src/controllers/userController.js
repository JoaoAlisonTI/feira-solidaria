const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

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

module.exports = {
  createUser
};
