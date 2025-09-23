import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PaginaPerfil.css";
import { authenticatedFetch } from "../../services/apiFetch";

export default function PaginaPerfil() {
  const [usuario, setUsuario] = useState(null);
  const [doacoesFeitas, setDoacoesFeitas] = useState([]);
  const [doacoesRecebidas, setDoacoesRecebidas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Esta função agora será usada para recarregar os dados após uma ação
  const carregarDados = async () => {
    try {
      setLoading(true);
      const [userRes, feitasRes, recebidasRes] = await Promise.all([
        authenticatedFetch("/usuarios/me"),
        authenticatedFetch("/usuarios/me/doacoes-feitas"),
        authenticatedFetch("/usuarios/me/doacoes-recebidas"),
      ]);
      setUsuario(userRes);
      setDoacoesFeitas(feitasRes);
      setDoacoesRecebidas(recebidasRes);
    } catch (err) {
      console.error("Erro ao carregar perfil:", err);
      if (err.message.includes("Token")) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, [navigate]);

  const handleConcluir = async (id) => {
    if (!window.confirm("Confirmar a entrega desta doação? Esta ação não pode ser desfeita.")) return;
    try {
      await authenticatedFetch(`/doacoes/${id}/concluir`, {
        method: "PATCH",
      });
      // Atualiza a lista para refletir a mudança
      carregarDados();
    } catch (err) {
      alert(`Erro ao finalizar doação: ${err.message}`);
    }
  };

  const handleRelistar = async (id) => {
    if (!window.confirm("Disponibilizar este item para doação novamente? A reserva atual será cancelada.")) return;
    try {
      await authenticatedFetch(`/doacoes/${id}/relistar`, {
        method: "PATCH",
      });
      // Atualiza a lista para refletir a mudança
      carregarDados();
    } catch (err) {
      alert(`Erro ao relistar doação: ${err.message}`);
    }
  };

  if (loading) return <div className="container mt-4"><p>Carregando perfil...</p></div>;

  return (
    <div className="container py-5">
      <div className="text-end mb-3">
        <button className="btn btn-danger" onClick={handleLogout}>
          Sair
        </button>
      </div>

      {usuario && (
        <div className="text-center mb-5">
          <img
            src={usuario.avatarUrl || "/default-avatar.png"}
            alt="Perfil"
            className="rounded-circle mb-3 profile-avatar"
          />
          <h3>{usuario.nome}</h3>
          <p className="text-success">
            Membro desde {new Date(usuario.createdAt).toLocaleDateString()}
          </p>
        </div>
      )}

      {/* Doações feitas */}
      <h4 className="mb-4">Minhas Doações</h4>
      <div className="row">
        {doacoesFeitas.length === 0 ? (
          <p>Você ainda não fez nenhuma doação.</p>
        ) : (
          doacoesFeitas.map(item => (
            <div key={item.id} className="col-md-4 col-lg-3 mb-4">
              <div className="card h-100">
                <img
                  src={item.imagemUrl || "/sem-imagem.jpg"}
                  alt={item.nomeItem}
                  className="card-img-top"
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.nomeItem}</h5>
                  <p className="card-text">{item.descricao}</p>
                  
                  <div className="mt-auto">
                    {item.status === 'DISPONIVEL' && (
                      <p><span className="badge bg-success">Disponível</span></p>
                    )}

                    {item.status === 'RESERVADA' && (
                      <div>
                        <p>
                          <span className="badge bg-warning text-dark">
                            Reservado por: {item.receptor?.nome || '...'}
                          </span>
                        </p>
                        <button className="btn btn-primary btn-sm me-2" onClick={() => handleConcluir(item.id)}>
                          Marcar como Entregue
                        </button>
                        <button className="btn btn-secondary btn-sm" onClick={() => handleRelistar(item.id)}>
                          Disponibilizar Novamente
                        </button>
                      </div>
                    )}

                    {item.status === 'ENTREGUE' && (
                       <p>
                          <span className="badge bg-secondary">
                            Entregue para: {item.receptor?.nome || '...'}
                          </span>
                       </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Doações recebidas */}
      <h4 className="mt-5 mb-4">Doações que Solicitei</h4>
      <div className="row">
        {doacoesRecebidas.length === 0 ? (
          <p>Você ainda não recebeu nenhuma doação.</p>
        ) : (
          doacoesRecebidas.map(item => (
            <div key={item.id} className="col-md-4 col-lg-3 mb-4">
              <div className="card">
                <img
                  src={item.imagemUrl || "/sem-imagem.jpg"}
                  alt={item.nomeItem}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5>{item.nomeItem}</h5>
                  <p>{item.descricao}</p>
                  <p>Status: {item.status}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}