/* import { Link } from 'react-router-dom';

function Perfil({ meusItens }) {
  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">📁 Meus Itens Cadastrados</h2>

      {meusItens.length === 0 ? (
        <div className="text-center text-muted">
          <p>Você ainda não cadastrou nenhum item.</p>
          <Link to="/cadastroItem" className="btn btn-outline-primary mt-3">
            Cadastrar meu primeiro item
          </Link>
        </div>
      ) : (
        <div className="row">
          {meusItens.map((item, index) => (
            <div className="col-sm-6 col-md-4 mb-4" key={index}>
              <div className="card h-100 shadow-sm">

                {item.imagem && (
                  <img
                    src={item.imagem}
                    alt={`Imagem de ${item.nome}`}
                    className="card-img-top"
                    style={{ objectFit: 'cover', maxHeight: '200px' }}
                  />
                )}

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.nome}</h5>
                  <h6 className="card-subtitle text-muted mb-2">
                    {item.categoria} • {item.cidade}
                  </h6>
                  <p className="card-text text-truncate">
                    {item.descricao}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Perfil;
*/ 

import React from "react";
import "./PaginaPerfil.css";
import { usuarioMock, produtosMock } from "../../data/mock";


export default function PaginaPerfil() {
  const usuario = usuarioMock;
  const produtos = produtosMock;

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <img
          src={usuario.avatar}
          alt="Perfil"
          className="rounded-circle mb-3 profile-avatar"
        />
        <h3>{usuario.nome}</h3>
        <p className="text-success">Membro Desde {usuario.desde}</p>
      </div>

      {/* Produtos */}
      <h4 className="mb-4">Doações deste usuário</h4>
      <div className="row">
        {produtos.map((item, index) => (
          <div className="col-md-4 col-lg-3 mb-4" key={index}>
            <div className="card h-100 text-center">
              <img
                src={item.imagem}
                className="card-img-top product-image"
                alt={item.nome}
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
