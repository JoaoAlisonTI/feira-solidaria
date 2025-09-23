import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authenticatedFetch } from '../services/apiFetch'; // Verifique se o caminho está correto

function CadastroItem() {
  const [item, setItem] = useState({
    nomeItem: '',
    categoriaId: '', // Armazenará o ID da categoria selecionada
    cidade: '',
    descricao: ''
  });
  const [imagem, setImagem] = useState(null);
  const [categorias, setCategorias] = useState([]); // Para armazenar as categorias do backend

  // Estados para controle de loading e mensagens de feedback
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });
  
  const navigate = useNavigate();

  // Busca as categorias da API assim que o componente é montado
  useEffect(() => {
    const buscarCategorias = async () => {
      try {
        const listaCategorias = await authenticatedFetch('/categorias');
        setCategorias(listaCategorias);
      } catch (error) {
        console.error("Erro ao buscar categorias", error);
        setMensagem({ tipo: 'danger', texto: 'Não foi possível carregar as categorias do servidor.' });
      }
    };
    buscarCategorias();
  }, []); // O array vazio [] garante que isso rode apenas uma vez

  // Atualiza o estado do formulário a cada mudança nos inputs
  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  // Lida com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem({ tipo: '', texto: '' });

    const formData = new FormData();
    formData.append('nomeItem', item.nomeItem);
    formData.append('categoriaId', item.categoriaId);
    formData.append('cidade', item.cidade);
    formData.append('descricao', item.descricao);
    if (imagem) {
      formData.append('imagem', imagem);
    }

    try {
      await authenticatedFetch('/doacoes', {
        method: 'POST',
        body: formData,
      });

      // Se deu certo, exibe mensagem de sucesso e limpa o formulário
      setMensagem({ tipo: 'success', texto: 'Item cadastrado com sucesso! Redirecionando...' });
      setItem({ nomeItem: '', categoriaId: '', cidade: '', descricao: '' });
      setImagem(null);
      document.querySelector('input[type="file"]').value = '';

      // Redireciona para a página inicial após 2 segundos
      setTimeout(() => {
        navigate('/'); 
      }, 2000);

    } catch (error) {
      setMensagem({ tipo: 'danger', texto: error.message || 'Erro ao cadastrar item. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4">
        <h2 className="mb-3 text-center">📦 Cadastro de Item</h2>
        <p className="text-muted text-center">
          Preencha as informações abaixo para doar um item à Feira Solidária
        </p>

        {/* Área para exibir mensagens de sucesso ou erro */}
        {mensagem.texto && (
          <div className={`alert alert-${mensagem.tipo}`} role="alert">
            {mensagem.texto}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            name="nomeItem"
            placeholder="Nome do item"
            value={item.nomeItem}
            onChange={handleChange}
            required
          />

          <select
            className="form-select mb-3"
            name="categoriaId"
            value={item.categoriaId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione a categoria</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nome}
              </option>
            ))}
          </select>

          <input
            className="form-control mb-3"
            name="cidade"
            placeholder="Cidade"
            value={item.cidade}
            onChange={handleChange}
            required
          />

          <textarea
            className="form-control mb-3"
            name="descricao"
            placeholder="Descrição do item (condição, tamanho, detalhes...)"
            value={item.descricao}
            onChange={handleChange}
            rows="3"
          />

          <label htmlFor="imagem" className="form-label">Imagem do item (opcional)</label>
          <input
            id="imagem"
            type="file"
            accept="image/*"
            className="form-control mb-3"
            onChange={(e) => setImagem(e.target.files[0])}
          />

          {imagem && (
            <div className="mb-3 text-center">
              <p>Pré-visualização:</p>
              <img
                src={URL.createObjectURL(imagem)}
                alt="Pré-visualização"
                className="img-thumbnail"
                style={{ maxWidth: '200px' }}
              />
            </div>
          )}

          <div className="d-grid gap-2">
            <button className="btn btn-warning" type="submit" disabled={loading}>
              {loading ? 'Enviando...' : 'Cadastrar Item'}
            </button>
            <Link to="/" className="btn btn-outline-secondary">
              Voltar ao Início
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CadastroItem;