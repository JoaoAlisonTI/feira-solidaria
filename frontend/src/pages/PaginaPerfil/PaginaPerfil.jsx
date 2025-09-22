import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PaginaPerfil.css";
// 1. IMPORTAR a nossa função fetch personalizada
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
  }

  useEffect(() => {
    async function carregarDados() {
      try {
        // 2. USAR authenticatedFetch para buscar os dados iniciais
        // A função já adiciona o token, a URL base e converte para .json()
        const [userRes, feitasRes, recebidasRes] = await Promise.all([
          authenticatedFetch("/usuarios/me"),
          authenticatedFetch("/usuarios/me/doacoes-feitas"),
          authenticatedFetch("/usuarios/me/doacoes-recebidas")
        ]);

        setUsuario(userRes);
        setDoacoesFeitas(feitasRes);
        setDoacoesRecebidas(recebidasRes);
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
        // Se o token for inválido, o erro 401 será capturado aqui.
        // Podemos redirecionar para o login.
        if (err.message.includes("Token")) {
           navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, [navigate]); // Adicionado navigate ao array de dependências

  // Função para finalizar doação
  const finalizarDoacao = async (id) => {
    try {
      // 3. USAR authenticatedFetch para a ação de finalizar
      const updated = await authenticatedFetch(`/doacoes/${id}/concluir`, {
        method: "PATCH",
        body: JSON.stringify({ receptorId: usuario?.id })
      });

      // Atualiza o estado local com a doação atualizada
      setDoacoesFeitas(prev =>
        prev.map(d => (d.id === id ? updated : d))
      );
    } catch (err) {
      console.error("Erro ao finalizar doação:", err);
      alert(err.message);
    }
  };

  if (loading) return <p>Carregando perfil...</p>;

  // O resto do seu código JSX continua exatamente igual
  return (
    <div className="container py-5">

      <div className="text-end mb-3">
        <button className="btn btn-danger" onClick={handleLogout}>
          Sair
        </button>
      </div>

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