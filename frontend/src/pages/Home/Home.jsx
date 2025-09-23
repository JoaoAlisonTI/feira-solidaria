import { useEffect, useState } from "react";
import heroImage from "../../assets/hero-section-image.svg";
import Input from "../../components/Input/Input";
import Produto from "../../components/Produto/Produto";
import { authenticatedFetch } from "../../services/apiFetch";

import "./home.css";

function Home() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Adicionar estados para controlar os filtros e a pesquisa
  const [filtroPesquisa, setFiltroPesquisa] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroLocalizacao, setFiltroLocalizacao] = useState("");

  useEffect(() => {
    async function fetchDoacoes() {
      try {
        const data = await authenticatedFetch("/doacoes");
        setProdutos(data);
      } catch (err) {
        setError("Erro ao carregar os produtos.");
        console.error("Erro ao buscar doações:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDoacoes();
  }, []);

  // 2. Criar listas de opções únicas para os filtros <select>
  const categoriasUnicas = Array.from(new Set(produtos.map(item => item.categoria?.nome).filter(Boolean)));
  const localizacoesUnicas = Array.from(new Set(produtos.map(item => `${item.cidade}, ${item.estado}`).filter(Boolean)));

  // 3. Aplicar a lógica de filtragem combinada
  const produtosFiltrados = produtos.filter((item) => {
    const termoPesquisa = filtroPesquisa.toLowerCase();
    
    // Condição da Pesquisa (nome ou descrição)
    const matchPesquisa = termoPesquisa === '' ||
      item.nomeItem.toLowerCase().includes(termoPesquisa) ||
      (item.descricao && item.descricao.toLowerCase().includes(termoPesquisa));

    // Condição da Categoria
    const matchCategoria = filtroCategoria === '' || item.categoria?.nome === filtroCategoria;

    // Condição da Localização
    const matchLocalizacao = filtroLocalizacao === '' || `${item.cidade}, ${item.estado}` === filtroLocalizacao;

    return matchPesquisa && matchCategoria && matchLocalizacao;
  });

  if (loading) return <p>Carregando produtos...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <main className="main container-md">
      <section
        className="hero-section d-flex justify-content-center align-items-center text-center"
        style={{ backgroundImage: `url(${heroImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
      }}
      >
        <div className="hero-content">
          <h1 className="titulo-hero fw-bold text-white">
            Conectando corações, partilhando alimentos.
          </h1>
          {/* 4. Conectar o componente Input aos estados */}
          <Input 
            valorPesquisa={filtroPesquisa}
            onValorChange={(e) => setFiltroPesquisa(e.target.value)}
          />
        </div>
      </section>

      <section className="list-itens-section">
        <div className="select-div">
          {/* 4. Conectar os <select> aos estados */}
          <select 
            className="select" 
            name="categoria"
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
          >
            <option value="">Todas as Categorias</option>
            {categoriasUnicas.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select 
            className="select" 
            name="localizacao"
            value={filtroLocalizacao}
            onChange={(e) => setFiltroLocalizacao(e.target.value)}
          >
            <option value="">Todas as Localizações</option>
            {localizacoesUnicas.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="produtos-div">
          {/* 5. Renderizar a lista de produtos JÁ FILTRADA */}
          {produtosFiltrados.length > 0 ? (
            produtosFiltrados.map((item) => (
              <Produto
                key={item.id}
                id={item.id}
                nomeProduto={item.nomeItem}
                descricaoProduto={item.descricao}
                localizacaoProduto={`${item.cidade}, ${item.estado}`}
                categoriaProduto={item.categoria?.nome}
                imagemProduto={item.imagemUrl}
              />
            ))
          ) : (
            <p className="text-center mt-4">Nenhum item encontrado com os filtros selecionados.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default Home;