import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import './App.css'; 

function App() {
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
      </main>
    </Router>
  );
}

export default App;