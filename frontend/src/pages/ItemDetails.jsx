import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { authenticatedFetch } from "../services/apiFetch";

import "./ItemDetails.css";

export default function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        //BUSCAR DADOS DO ITEM E DO USUÁRIO LOGADO AO MESMO TEMPO
        const [itemData, userData] = await Promise.all([
          authenticatedFetch(`/doacoes/${id}`),
          authenticatedFetch('/usuarios/me')
        ]);
        setItem(itemData);
        setUsuarioLogado(userData);
      } catch (err) {
        setError("Erro ao carregar os dados. Tente novamente.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const handleReservar = async () => {
    if (!window.confirm("Tem certeza que deseja reservar este item?")) return;

    try {
      const itemAtualizado = await authenticatedFetch(`/doacoes/${id}/reservar`, {
        method: "PATCH",
      });
      // Atualiza o estado local para a UI mudar instantaneamente
      setItem(itemAtualizado); 
      alert("Item reservado com sucesso! Agora você pode entrar em contato com o doador.");
    } catch (err) {
      alert(`Não foi possível reservar: ${err.message}`);
    }
  };

  const handleContatoWhatsapp = () => {
    if (!item?.doador?.telefone) {
      alert("O doador não forneceu um número de telefone.");
      return;
    }
    const numeroCompleto = item.doador.telefone.startsWith('55') ? item.doador.telefone : `55${item.doador.telefone}`;
    window.open(`https://wa.me/${numeroCompleto}`, '_blank');
  };

  //LÓGICA PARA RENDERIZAR O BOTÃO CORRETO
  const renderizarBotaoAcao = () => {
    if (!usuarioLogado) return null; // Não mostra botões se o usuário não estiver logado

    // Se o usuário logado for o doador do item
    if (item.doadorId === usuarioLogado.id) {
      return <span className="badge bg-info text-dark">Você é o doador deste item</span>;
    }

    switch (item.status) {
      case 'DISPONIVEL':
        return <button className="btn btn-success w-100" onClick={handleReservar}>Reservar Item</button>;
      
      case 'RESERVADA':
        // Mostra o botão de contato APENAS para o usuário que reservou
        if (item.receptorId === usuarioLogado.id) {
          return <button className="btn btn-primary w-100" onClick={handleContatoWhatsapp}>Entrar em contato (WhatsApp)</button>;
        }
        return <button className="btn btn-warning w-100" disabled>Já Reservado por Outra Pessoa</button>;
        
      case 'ENTREGUE':
        return <button className="btn btn-secondary w-100" disabled>Doação Finalizada</button>;
        
      default:
        return null;
    }
  };

  if (loading) return <div className="container mt-4"><p>Carregando detalhes...</p></div>;
  if (error) return <div className="container mt-4"><p style={{ color: "red" }}>{error}</p></div>;
  if (!item) return <div className="container mt-4"><p>Item não encontrado.</p></div>;

  return (
    <div className="item-details container my-5">
      <div className="row">
        <div className="col-md-7">
          <img
            src={item.imagemUrl || "https://via.placeholder.com/600x400"}
            alt={item.nomeItem}
            className="img-fluid rounded shadow-sm"
          />
        </div>

        <div className="col-md-5">
          <div className="card p-4 h-100">
            <h2 className="h3">{item.nomeItem}</h2>
            <p className="lead text-muted">{item.descricao}</p>
            <hr />
            <p><strong>Categoria:</strong> {item.categoria?.nome}</p>
            <p><strong>Localização:</strong> {item.cidade}</p>
            <p><strong>Doador:</strong> {item.doador?.nome}</p>
            <p>
              <strong>Status:</strong>
              <span className={`badge ms-2 bg-${item.status === 'DISPONIVEL' ? 'success' : 'warning'}`}>{item.status}</span>
            </p>
            <div className="mt-auto">
              {renderizarBotaoAcao()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}