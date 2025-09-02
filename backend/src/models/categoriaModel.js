const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

 
const getAllCategorias = async () => {
  return prisma.categoria.findMany({
    orderBy: {
      nome: 'desc'
    }
  });
};
 
const getCategoriaById = async (id) => {
  return prisma.categoria.findUnique({
    where: {
      id: id
    }
  });
};

 
const addCategoria = async (nome) => {
  return prisma.categoria.create({
    data: {
      nome: nome
    }
  });
};

 
const updateCategoria = async (id, nome) => {
  const categoria = await prisma.categoria.findUnique({
    where: {
      id: id
    }
  });

  if (!categoria) {
    throw new Error('Categoria não encontrada');
  }

  return prisma.categoria.update({
    where: {
      id: id
    },
    data: {
      nome: nome
    }
  });
};

 
const deleteCategoria = async (id) => {
  const categoria = await prisma.categoria.findUnique({
    where: {
      id: id
    }
  });

  if (!categoria) {
    throw new Error('Categoria não encontrada');
  }

  return prisma.categoria.delete({
    where: {
      id: id
    }
  });
};

module.exports = {
  getAllCategorias,
  getCategoriaById,
  addCategoria,
  updateCategoria,
  deleteCategoria
};
