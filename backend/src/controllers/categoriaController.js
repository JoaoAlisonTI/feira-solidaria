const {
  getAllCategorias,
  getCategoriaById,
  addCategoria,
  updateCategoria,
  deleteCategoria
} = require('../models/categoriaModel');

const getAllCategoriasHandler = async (req, res) => {
  try {
    const categorias = await getAllCategorias();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message || "Erro ao buscar categorias" });
  }
};

const getCategoriaByIdHandler = async (req, res) => {
  const id_categoria = parseInt(req.params.id_categoria);

  try {
    const categoria = await getCategoriaById(id_categoria);

    if (!categoria) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    res.status(200).json(categoria);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar categoria" });
  }
};

const addCategoriaHandler = async (req, res) => {
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ error: "Nome é obrigatório" });
  }

  try {
    const categoria = await addCategoria(nome);
    res.status(201).json(categoria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCategoriaHandler = async (req, res) => {
  const id_categoria = parseInt(req.params.id_categoria);
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ error: "Nome é obrigatório" });
  }

  try {
    const categoria = await updateCategoria(id_categoria, nome);
    res.status(200).json(categoria);
  } catch (error) {
    if (error.message === 'Categoria não encontrada') {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }
    res.status(500).json({ error: "Erro ao atualizar categoria" });
  }
};

const deleteCategoriaHandler = async (req, res) => {
  const id_categoria = parseInt(req.params.id_categoria);

  try {
    await deleteCategoria(id_categoria);
    res.status(200).json({ message: "Categoria deletada com sucesso" });
  } catch (error) {
    if (error.message === 'Categoria não encontrada') {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }
    res.status(500).json({ error: "Erro ao deletar categoria" });
  }
};

module.exports = {
  getAllCategoriasHandler,
  getCategoriaByIdHandler,
  addCategoriaHandler,
  updateCategoriaHandler,
  deleteCategoriaHandler
};
