import { useState } from 'react';
import { Link } from 'react-router-dom';

function CadastroItem({ onAdicionar, setMensagem }) {
  const [item, setItem] = useState({
    nome: '',
    categoria: '',
    cidade: '',
    descricao: ''
  });

  const [imagem, setImagem] = useState(null);

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const itemComImagem = {
      ...item,
      imagem: imagem ? URL.createObjectURL(imagem) : null
    };

    onAdicionar(itemComImagem);
    setItem({ nome: '', categoria: '', cidade: '', descricao: '' });
    setImagem(null);

    setMensagem('Item cadastrado com sucesso!');
    setTimeout(() => setMensagem(''), 3000);
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4">
        <h2 className="mb-3 text-center">📦 Cadastro de Item</h2>
        <p className="text-muted text-center">
          Preencha as informações abaixo para doar um item à Feira Solidária
        </p>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            name="nome"
            placeholder="Nome do item"
            value={item.nome}
            onChange={handleChange}
            required
          />

          <select
            className="form-select mb-3"
            name="categoria"
            value={item.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Selecione a categoria</option>
            <option value="Roupas">Roupas</option>
            <option value="Calçados">Calçados</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Brinquedos">Brinquedos</option>
            <option value="Livros">Livros</option>
            <option value="Outros">Outros</option>
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

          <input
            type="file"
            accept="image/*"
            className="form-control mb-3"
            onChange={(e) => setImagem(e.target.files[0])}
          />

          {imagem && (
            <div className="mb-3 text-center">
              <img
                src={URL.createObjectURL(imagem)}
                alt="Pré-visualização"
                className="img-thumbnail"
                style={{ maxWidth: '200px' }}
              />
            </div>
          )}

          <div className="d-grid gap-2">
            <button className="btn btn-warning" type="submit">
              Cadastrar Item
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
