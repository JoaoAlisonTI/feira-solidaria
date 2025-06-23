import { useState } from 'react';
import { Link, Navigate, BrowserRouter as Router, Routes, Route} from 'react-router-dom';
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
          <Route 
            path="/" 
            element={
              <div className="container text-center mt-5">
                <h1>Bem-vindo ao Solidário</h1>
                <p>Sua plataforma de doações.</p>
              </div>
            } 
          />
          <Route 
            path="/cadastroItem" 
            element={
              <CadastroItem 
                onAdicionar={adicionarItem} 
                setMensagem={setMensagemAlerta} 
              />
            } 
          />
          <Route path="/perfil" element={<Perfil meusItens={itens} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    
        {/* Agora fora do <Routes> */}
        <div className="container mt-3">
          {mensagemAlerta && (
            <div className="alert alert-success text-center" role="alert">
              {mensagemAlerta}
            </div>
          )}
        </div>
      </main>
    </Router>
  );
}

export default App;