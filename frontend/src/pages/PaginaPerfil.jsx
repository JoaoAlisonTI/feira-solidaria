import { Link } from 'react-router-dom';

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
