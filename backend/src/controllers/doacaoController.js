const doacaoModel = require('../models/doacaoModel');

const createDoacao = async (req, res) => {
  try {
    const { nomeItem, descricao, imagemUrl, cidade, estado, enderecoColeta, quantidade, doadorId, categoriaId } = req.body;

    if (!nomeItem || !descricao || !doadorId || !categoriaId) {
      return res.status(400).json({ error: "Campos obrigatórios: nomeItem, descricao, doadorId, categoriaId." });
    }

    const novaDoacao = await doacaoModel.addDoacao({
      nomeItem,
      descricao,
      imagemUrl,
      cidade,
      estado,
      enderecoColeta,
      quantidade,
      doadorId,
      categoriaId
    });

    res.status(201).json(novaDoacao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar doação." });
  }
};

const getDoacoes = async (req, res) => {
  try {
    const doacoes = await doacaoModel.getAllDoacoes();
    res.json(doacoes);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar doações." });
  }
};

const getDoacaoById = async (req, res) => {
  try {
    const { id } = req.params;
    const doacao = await doacaoModel.getDoacaoById(Number(id));

    if (!doacao) {
      return res.status(404).json({ error: "Doação não encontrada." });
    }

    res.json(doacao);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar doação." });
  }
};

const updateDoacao = async (req, res) => {
  try {
    const { id } = req.params;
    const { nomeItem, descricao, imagemUrl, cidade, estado, enderecoColeta, quantidade, status, receptorId, categoriaId } = req.body;

    const doacaoAtualizada = await doacaoModel.updateDoacao(Number(id), {
      nomeItem,
      descricao,
      imagemUrl,
      cidade,
      estado,
      enderecoColeta,
      quantidade,
      status,
      receptorId,
      categoriaId
    });

    res.json(doacaoAtualizada);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar doação." });
  }
};

module.exports = {
  createDoacao,
  getDoacoes,
  getDoacaoById,
  updateDoacao
};