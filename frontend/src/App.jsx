import { useState } from 'react';
import { Link, Navigate, BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import CadastroItem from './pages/CadastroItem';
import Perfil from './pages/PaginaPerfil';
import './App.css'; 

function App() {
  const [itens, setItens] = useState([]);
  const [mensagemAlerta, setMensagemAlerta] = useState('');

  const adicionarItem = (item) => setItens([...itens, item]);

  return (
   <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<RegisterPage />} />
          
          {/* Rota para a página inicial */}
          <Route path="/" element={
            <div className="container text-center mt-5">
              <h1>Bem-vindo ao Solidário</h1>
              <p>Sua plataforma de doações.</p>
            </div>
          } />

          {/* Redireciona qualquer rota não encontrada para a página inicial */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main
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