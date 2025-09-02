const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllDoacoes = async () => {
  return prisma.doacao.findMany({
    include: {
      categoria: true,
      doador: true,
      receptor: true
    },
    orderBy: { createdAt: 'desc' }
  });
};

const getDoacaoById = async (id) => {
  return prisma.doacao.findUnique({
    where: { id },
    include: {
      categoria: true,
      doador: true,
      receptor: true
    }
  });
};

const addDoacao = async (data) => {
  return prisma.doacao.create({
    data
  });
};

const updateDoacao = async (id, data) => {
  return prisma.doacao.update({
    where: { id },
    data
  });
};

module.exports = {
  getAllDoacoes,
  getDoacaoById,
  addDoacao,
  updateDoacao
};