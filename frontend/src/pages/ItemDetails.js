import React from 'react';
import './ItemDetails.css';
import itemData from '../data/item.json';

function ItemDetails() {
  const { nome, descricao, categoria, localizacao, imagem } = itemData;

  return (
    <div className="app">
      <div className="breadcrumb">Alimentos / {nome}</div>

      <div className="main-image">
        <img src={imagem} alt={nome} />
      </div>

      <h1>{nome}</h1>
      <p className="description">{descricao}</p>

      <div className="details">
        <div><strong>Categoria:</strong> {categoria}</div>
        <div><strong>Localização:</strong> {localizacao}</div>
      </div>

      <button className="contact-button">Entrar em Contato</button>
    </div>
  );
}

export default ItemDetails;
