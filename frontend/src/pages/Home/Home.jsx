import { useEffect, useState } from "react";
import heroImage from "../../assets/hero-section-image.svg";
import Input from "../../components/Input/Input";
import Produto from "../../components/Produto/Produto";
import api from "../../services/api";

import "./home.css";

function Home() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Estados para filtros
    const [filtroCategoria, setFiltroCategoria] = useState("");
    const [filtroCidade, setFiltroCidade] = useState("");
    const [filtroEstado, setFiltroEstado] = useState("");

    useEffect(() => {
        const fetchDoacoes = async () => {
            try {
                const response = await api.get("/doacoes");
                setProdutos(response.data);
            } catch (error) {
                console.error("Erro ao buscar doações:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDoacoes();
    }, []);

    if (loading) {
        return <p>Carregando itens...</p>;
    }

    // Filtrando os produtos antes de renderizar
    const produtosFiltrados = produtos.filter((item) => {
        return (
            (filtroCategoria ? item.categoria.nome === filtroCategoria : true) &&
            (filtroCidade ? item.cidade === filtroCidade : true) &&
            (filtroEstado ? item.estado === filtroEstado : true)
        );
    });

    return (
        <main className="main container-md">
            <section
                className="hero-section d-flex justify-content-center align-items-center text-center"
                style={{
                    backgroundImage: `url(${heroImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
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
                    <select
                        className="select"
                        value={filtroCategoria}
                        onChange={(e) => setFiltroCategoria(e.target.value)}
                    >
                        <option value="">Categoria</option>
                        {[...new Set(produtos.map((item) => item.categoria.nome))].map(
                            (cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            )
                        )}
                    </select>

                    <select
                        className="select"
                        value={filtroCidade}
                        onChange={(e) => setFiltroCidade(e.target.value)}
                    >
                        <option value="">Cidade</option>
                        {[...new Set(produtos.map((item) => item.cidade))].map((cidade) => (
                            <option key={cidade} value={cidade}>
                                {cidade}
                            </option>
                        ))}
                    </select>

                    <select
                        className="select"
                        value={filtroEstado}
                        onChange={(e) => setFiltroEstado(e.target.value)}
                    >
                        <option value="">Estado</option>
                        {[...new Set(produtos.map((item) => item.estado))].map((estado) => (
                            <option key={estado} value={estado}>
                                {estado}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="produtos-div">
                    {produtosFiltrados.map((item) => (
                        <Produto
                            key={item.id}
                            nomeProduto={item.nomeItem}
                            descricaoProduto={item.descricao}
                            localizacaoProduto={item.cidade}
                            categoriaProduto={item.categoria.nome}
                            imagemProduto={item.imagemUrl}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}

export default Home;
