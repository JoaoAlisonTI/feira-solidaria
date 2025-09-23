const doacaoModel = require('../models/doacaoModel');

const createDoacao = async (req, res) => {
  try {
    const { nomeItem, descricao, cidade, estado, enderecoColeta, quantidade, categoriaId } = req.body;

    const doadorId = req.user.id;

    const imagemUrl = req.file ? `${process.env.APP_URL}/uploads/${req.file.filename}` : null;

    // Validação dos campos essenciais
    if (!nomeItem || !descricao || !categoriaId) {
      return res.status(400).json({ error: "Campos obrigatórios: nomeItem, descricao, categoriaId." });
    }

    // Monta o objeto de dados com as informações das fontes corretas
    const dadosParaSalvar = {
      nomeItem,
      descricao,
      imagemUrl,
      cidade,
      estado,
      enderecoColeta,
      quantidade: quantidade ? parseInt(quantidade, 10) : 1,
      doadorId: parseInt(doadorId, 10),
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
    const doadorId = req.user.id; // ID do doador logado

    const doacao = await doacaoModel.getDoacaoById(Number(id));

    if (doacao.doadorId !== doadorId) {
      return res.status(403).json({ error: "Você não tem permissão para alterar esta doação." });
    }

    const doacaoConcluida = await doacaoModel.updateDoacao(Number(id), {
      status: "ENTREGUE",
    });
    res.json(doacaoConcluida);
  } catch (error) {
    console.error("❌ Erro em concluirDoacao:", error);
    res.status(500).json({ error: "Erro ao concluir doação." });
  }
};

const relistarDoacao = async (req, res) => {
  try {
    const { id } = req.params;
    const doadorId = req.user.id;

    const doacao = await doacaoModel.getDoacaoById(Number(id));

    // Validação: Só o doador original pode relistar o item
    if (doacao.doadorId !== doadorId) {
      return res.status(403).json({ error: "Você não tem permissão para alterar esta doação." });
    }

    // Atualiza o status e remove o receptor
    const doacaoRelistada = await doacaoModel.updateDoacao(Number(id), {
      status: "DISPONIVEL",
      receptorId: null,
    });
    res.status(200).json(doacaoRelistada);
  } catch (error) {
    console.error("❌ Erro em relistarDoacao:", error);
    res.status(500).json({ error: "Erro ao disponibilizar doação." });
  }
};

const reservarDoacao = async (req, res) => {
  try {
    const { id } = req.params;
    
    // ID do usuário que quer receber (o receptor) vem do token de autenticação
    const receptorId = req.user.id;

    // 1. Buscamos a doação no banco para fazer as validações
    const doacao = await doacaoModel.getDoacaoById(Number(id));

    // 2. Validações importantes
    if (!doacao) {
      return res.status(404).json({ error: "Doação não encontrada." });
    }
    if (doacao.status !== 'DISPONIVEL') {
      return res.status(400).json({ error: "Esta doação não está mais disponível." });
    }
    if (doacao.doadorId === receptorId) {
      return res.status(400).json({ error: "Você não pode reservar um item que você mesmo doou." });
    }

    // 3. Se tudo estiver certo, atualizamos a doação
    const doacaoReservada = await doacaoModel.updateDoacao(Number(id), {
      status: "RESERVADA",
      receptorId: receptorId
    });

    res.status(200).json(doacaoReservada);

  } catch (error) {
    console.error("❌ Erro em reservarDoacao:", error);
    res.status(500).json({ error: "Erro ao reservar doação." });
  }
};

module.exports = {
  createDoacao,
  getDoacoes,
  getDoacaoById,
  updateDoacao,
  concluirDoacao,
  relistarDoacao,
  reservarDoacao
};