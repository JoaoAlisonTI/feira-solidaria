import React from "react";
import "./PaginaPerfil.css";
import { usuarioMock, produtosMock } from "../data/mock";

export default function PaginaPerfil() {
  const usuario = usuarioMock;
  const produtos = produtosMock;

  return (
    <div className="container py-5">

      {/* 🔹 Perfil do usuário */}
      <div className="text-center mb-5">
        <img
          src={usuario.avatar}
          alt={`Foto de ${usuario.nome}`}
          className="profile-avatar"
        />
        <h3>{usuario.nome}</h3>
        <p className="perfil-cidade">{usuario.cidade}</p>

        <p className="text-success">Membro desde {usuario.desde}</p>
        <p className="text-muted mb-1">
          Já doou <strong>{usuario.totalDoacoes}</strong> itens para{" "}
          <strong>{usuario.familiasAjudadas}</strong> famílias.
        </p>
      </div>

      {/* 🔹 Título da seção de doações */}
      <h5 className="categoria-titulo">🎁 Itens disponíveis para doação</h5>

      {/* 🔹 Cards de produtos sem cidade */}
      <div className="row">
        {produtos.map((item, index) => (
          <div className="col-md-4 col-lg-3 mb-4" key={index}>
            <div className="card h-100 text-center">
              <img
                src={item.imagem}
                alt={item.nome}
                className="card-img-top product-image"
              />
              <div className="card-body">
                <h6 className="card-title">{item.nome}</h6>
                <p className="card-text text-muted">{item.descricao}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
