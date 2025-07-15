import heroImage from "../../assets/hero-section-image.svg"
import Input from "../../components/Input/Input"
import Produto from "../../components/Produto/Produto"
import { produtosMock } from "../../data/mock"

import "./home.css"

function Home() {

    const produtos = produtosMock

    return (
        <>
            <main className="main container-md">
                <section
                    className="hero-section d-flex justify-content-center align-items-center text-center"
                    style={{
                        backgroundImage: `url(${heroImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                    >
                    <div className="hero-content">
                        <h1 className="titulo-hero fw-bold text-white">
                        Conectando corações, partilhando alimentos.
                        </h1>
                        <Input />
                    </div>
                </section>
                <section className="list-itens-section">
                    <div className="select-div">
                        <select className="select" name="categoria">
                            <option value="">Categoria</option>
                            {produtos.map((item) => (
                                <option value={item.categoria}>{item.categoria}</option>
                            ))}
                        </select>

                        <select className="select" name="localizacao">
                            <option value="">Localização</option>
                            {produtos.map((item) => (
                                <option value={item.localizacao}>{item.localizacao}</option>
                            ))}
                        </select>
                    </div>

                    <div className="produtos-div">
                        {produtos.map((item) => (
                            <Produto  
                                key={item.id}
                                nomeProduto={item.nome}
                                descricaoProduto={item.descricao}
                                localizacaoProduto={item.localizacao}
                                categoriaProduto={item.categoria}
                                imagemProduto={item.imagem}
                            />
                        ))}
                    </div>    
                </section>    
            </main>
        
        </>
    )
}

export default Home