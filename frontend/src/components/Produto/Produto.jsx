import { Link } from "react-router-dom";
import "./produto.css";

const Produto = ({ id, nomeProduto, descricaoProduto, localizacaoProduto, categoriaProduto, imagemProduto }) => {
  return (
    <div className="div-produto-conatiner container-fluid">
      <div className="div-produto-detalhes">
        <h3>{nomeProduto}</h3>
        <p>{descricaoProduto}</p>
        <div className="div-spans">
          <span>{localizacaoProduto}</span>
          <span>{categoriaProduto}</span>
        </div>
        <div className="div-button">
          <Link to={`/itemDetails/${id}`} className="btn-detalhes">
            Ver detalhes
          </Link>
        </div>
      </div>
      <div className="div-produto-img">
        <img src={imagemProduto} alt="Imagem do produto" />
      </div>
    </div>
  );
};

export default Produto;
