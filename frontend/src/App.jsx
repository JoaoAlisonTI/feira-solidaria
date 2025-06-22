import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import CadastroItem from './pages/CadastroItem';
import Perfil from './pages/PaginaPerfil';
import './App.css';

function App() {
  const [itens, setItens] = useState([]);
  const [mensagemAlerta, setMensagemAlerta] = useState('');

  const adicionarItem = (item) => setItens([...itens, item]);

  return (
    <Router>
      <div className="container mt-3">
        
        {/* Alerta de sucesso */}
        {mensagemAlerta && (
          <div className="alert alert-success text-center" role="alert">
            {mensagemAlerta}
          </div>
        )}

        {/* Navegação */}
        <nav className="mb-4">
          <Link to="/" className="btn btn-outline-secondary me-2">Início</Link>
          <Link to="/cadastro" className="btn btn-outline-primary me-2">Cadastrar</Link>
          <Link to="/perfil" className="btn btn-outline-success">Perfil</Link>
        </nav>

        {/* Rotas */}
        <Routes>
          <Route path="/" element={<h1>Seja bem-vindo(a) ao Feira Solidária!</h1>} />
          <Route 
            path="/cadastro" 
            element={
              <CadastroItem 
                onAdicionar={adicionarItem} 
                setMensagem={setMensagemAlerta} 
              />
            } 
          />
          <Route path="/perfil" element={<Perfil meusItens={itens} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
