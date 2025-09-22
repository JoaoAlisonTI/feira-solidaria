const doacaoModel = require('../models/doacaoModel');

const createDoacao = async (req, res) => {
  try {
    // 1. DADOS DE TEXTO vêm de 'req.body'
    const { nomeItem, descricao, cidade, estado, enderecoColeta, quantidade, categoriaId } = req.body;

    // 2. ID DO DOADOR vem de 'req.user' (fornecido pelo authMiddleware)
    const doadorId = req.user.id;

    // 3. INFORMAÇÕES DA IMAGEM vêm de 'req.file' (fornecido pelo multer)
    // Construímos a URL que será salva no banco de dados.
    // Garanta que a variável APP_URL esteja no seu arquivo .env (ex: APP_URL=http://localhost:3001)
    const imagemUrl = req.file ? `${process.env.APP_URL}/uploads/${req.file.filename}` : null;

    // Validação dos campos essenciais
    if (!nomeItem || !descricao || !categoriaId) {
      return res.status(400).json({ error: "Campos obrigatórios: nomeItem, descricao, categoriaId." });
    }

    // Monta o objeto de dados com as informações das fontes corretas
    const dadosParaSalvar = {
      nomeItem,
      descricao,
      imagemUrl, // Salva a URL da imagem
      cidade,
      estado,
      enderecoColeta,
      quantidade: quantidade ? parseInt(quantidade, 10) : 1,
      doadorId: parseInt(doadorId, 10), // Usa o ID do usuário logado
      categoriaId: parseInt(categoriaId, 10)
    };

    const novaDoacao = await doacaoModel.addDoacao(dadosParaSalvar);

    res.status(201).json(novaDoacao);
  } catch (error) {
    console.error("❌ Erro em createDoacao:", error);
    res.status(500).json({ error: "Erro ao criar doação." });
  }
};

const getDoacoes = async (req, res) => {
  try {
    // Esta função está correta, pois chama o model que já corrigimos para incluir a categoria.
    const doacoes = await doacaoModel.getAllDoacoes();
    res.json(doacoes);
  } catch (error)
 {
    console.error("❌ Erro em getDoacoes:", error);
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
    console.error("❌ Erro em getDoacaoById:", error);
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
    console.error("❌ Erro em updateDoacao:", error);
    res.status(500).json({ error: "Erro ao atualizar doação." });
  }
};

const concluirDoacao = async (req, res) => {
  try {
    const { id } = req.params;
    const { receptorId } = req.body;

    const doacaoConcluida = await doacaoModel.updateDoacao(Number(id), {
      status: "ENTREGUE",
      receptorId
    });

    res.json(doacaoConcluida);
  } catch (error) {
    console.error("❌ Erro em concluirDoacao:", error);
    res.status(500).json({ error: "Erro ao concluir doação." });
  }
};

module.exports = {
  createDoacao,
  getDoacoes,
  getDoacaoById,
  updateDoacao,
  concluirDoacao
};