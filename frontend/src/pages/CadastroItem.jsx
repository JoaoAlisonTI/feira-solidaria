import { useState } from 'react';

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

    // mensagem de sucesso controlada pelo App.jsx
    setMensagem('Item cadastrado com sucesso!');
    setTimeout(() => setMensagem(''), 3000);
  };

  return (
    <div className="container mt-4">
      <h2>Cadastrar Item</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="nome"
          placeholder="Nome do item"
          value={item.nome}
          onChange={handleChange}
          required
        />

        <select
          className="form-select mb-2"
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
          className="form-control mb-2"
          name="cidade"
          placeholder="Cidade"
          value={item.cidade}
          onChange={handleChange}
          required
        />

        <textarea
          className="form-control mb-3"
          name="descricao"
          placeholder="Descrição"
          value={item.descricao}
          onChange={handleChange}
        />

        <input
          type="file"
          accept="image/*"
          className="form-control mb-2"
          onChange={(e) => setImagem(e.target.files[0])}
        />

        {imagem && (
          <div className="mb-3">
            <img
              src={URL.createObjectURL(imagem)}
              alt="Pré-visualização"
              className="img-thumbnail"
              style={{ maxWidth: '200px' }}
            />
          </div>
        )}

        <button className="btn btn-warning" type="submit">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default CadastroItem;
