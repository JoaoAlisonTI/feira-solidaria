function Perfil({ meusItens }) {
  return (
    <div className="container mt-4">
      <h2>Meus Itens Cadastrados</h2>

      {meusItens.length === 0 ? (
        <p className="text-muted">Você ainda não cadastrou nenhum item.</p>
      ) : (
        <div className="row">
          {meusItens.map((item, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div className="card h-100">

                {/* Imagem do item (se existir) */}
                {item.imagem && (
                  <img
                    src={item.imagem}
                    alt={`Imagem de ${item.nome}`}
                    className="card-img-top"
                    style={{ objectFit: 'cover', maxHeight: '250px' }}
                  />
                )}

                <div className="card-body">
                  <h5 className="card-title">{item.nome}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {item.categoria} • {item.cidade}
                  </h6>
                  <p className="card-text">{item.descricao}</p>
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
