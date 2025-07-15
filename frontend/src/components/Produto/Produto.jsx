import imagemProdutoExamplo from "/public/camisetas.jpg"
import "./produto.css"

const Produto = () => {
    return (
        <div className="div-produto-conatiner container-fluid">
            <div className="div-produto-detalhes">
                <h3>Nome Produto</h3>
                <p>Descrição do produto</p>
                <div className="div-spans">
                    <span>Localização</span>
                    <span>Categoria</span>
                </div>
                <div className="div-button">
                    <button>Ver detalhes</button>
                </div>
            </div>
            <div className="div-produto-img">
                <img src={imagemProdutoExamplo} alt="Imagem do produto" />
            </div>
        </div>
    )
}

export default Produto