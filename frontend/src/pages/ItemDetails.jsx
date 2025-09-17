import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ItemDetails.css";

export default function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchItem() {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/doacoes/${id}`
        );
        setItem(response.data);
      } catch (err) {
        setError("Erro ao carregar os detalhes do item.");
      } finally {
        setLoading(false);
      }
    }

    fetchItem();
  }, [id]);

  if (loading) return <p>Carregando detalhes...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!item) return <p>Item não encontrado.</p>;

  return (
    <div className="item-details container mt-4">
      <nav className="breadcrumb">
        {item.categoria?.nome} / {item.nomeItem}
      </nav>

      <div className="row">
        <div className="col-md-6">
          <img
            src={item.imagemUrl || "https://via.placeholder.com/400x300"}
            alt={item.nomeItem}
            className="img-fluid rounded"
          />
        </div>

        <div className="col-md-6">
          <h2>{item.nomeItem}</h2>
          <p>{item.descricao}</p>

          <p>
            <strong>Categoria:</strong> {item.categoria?.nome}
          </p>
          <p>
            <strong>Localização:</strong> {item.cidade}, {item.estado}
          </p>
          <p>
            <strong>Status:</strong> {item.status}
          </p>

          {item.doador && (
            <p>
              <strong>Doador:</strong> {item.doador.nome}
            </p>
          )}

          <button className="btn btn-success">Entrar em Contato</button>
        </div>
      </div>
    </div>
  );
}
