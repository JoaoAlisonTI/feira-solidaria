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

  useEffect(() => {
    async function fetchDoacoes() {
      try {
        const data = await authenticatedFetch("/doacoes", { method: "GET" });
        setProdutos(data);
      } catch (err) {
        setError("Erro ao carregar os produtos.");
      } finally {
        setLoading(false);
      }
    }

    fetchDoacoes();
  }, []);

  if (loading) return <p>Carregando produtos...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

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
          <select className="select" name="categoria">
            <option value="">Categoria</option>
            {produtos.map((item) => (
              <option key={item.id} value={item.categoria?.nome}>
                {item.categoria?.nome}
              </option>
            ))}
          </select>

          <select className="select" name="localizacao">
            <option value="">Localização</option>
            {produtos.map((item) => (
              <option key={item.id} value={`${item.cidade}, ${item.estado}`}>
                {item.cidade}, {item.estado}
              </option>
            ))}
          </select>
        </div>

        <div className="produtos-div">
          {produtos.map((item) => (
            <Produto
              key={item.id}
              id={item.id}
              nomeProduto={item.nomeItem}
              descricaoProduto={item.descricao}
              localizacaoProduto={`${item.cidade}, ${item.estado}`}
              categoriaProduto={item.categoria?.nome}
              imagemProduto={item.imagemUrl}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
