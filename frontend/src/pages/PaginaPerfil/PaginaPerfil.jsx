import React, { useState, useEffect } from "react";
import "./PaginaPerfil.css";

export default function PaginaPerfil() {
  const [usuario, setUsuario] = useState(null);
  const [doacoesFeitas, setDoacoesFeitas] = useState([]);
  const [doacoesRecebidas, setDoacoesRecebidas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [userRes, feitasRes, recebidasRes] = await Promise.all([
          fetch("http://localhost:3001/api/usuarios/me").then(r => r.json()),
          fetch("http://localhost:3001/api/usuarios/me/doacoes-feitas").then(r => r.json()),
          fetch("http://localhost:3001/api/usuarios/me/doacoes-recebidas").then(r => r.json())
        ]);

        setUsuario(userRes);
        setDoacoesFeitas(feitasRes);
        setDoacoesRecebidas(recebidasRes);
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, []);

  // Função para finalizar doação
  const finalizarDoacao = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/api/doacoes/${id}/concluir`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ receptorId: usuario?.id })
      });

      if (res.ok) {
        const updated = await res.json();
        setDoacoesFeitas(prev =>
          prev.map(d => d.id === id ? updated : d)
        );
      }
    } catch (err) {
      console.error("Erro ao finalizar doação:", err);
    }
  };

  if (loading) return <p>Carregando perfil...</p>;

  return (
    <div className="container py-5">
      {/* Cabeçalho do Perfil */}
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

                  {item.status !== "ENTREGUE" ? (
                    <button
                      className="btn btn-success"
                      onClick={() => finalizarDoacao(item.id)}
                    >
                      Finalizar
                    </button>
                  ) : (
                    <span className="text-muted">✔ Finalizado</span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Doações recebidas */}
      <h4 className="mb-4">Doações Recebidas</h4>
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
