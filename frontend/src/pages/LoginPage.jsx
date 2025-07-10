import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/users?email=${email}&password=${password}`);
      const users = await response.json();
      if (users.length > 0) {
        alert('Login bem-sucedido!');
        navigate('/');
      } else {
        alert('Email ou senha inválidos.');
      }
    } catch (error) {
      alert('Ocorreu um erro no servidor.');
    }
  };

  return (
    <div className="container d-flex justify-content-center py-5">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <h2 className="h3 fw-bold text-center my-4 text-custom-dark">Entrar</h2>
        <form onSubmit={handleLogin} className="px-4">
          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label fw-medium text-custom-dark">Email</label>
            <input
              type="email"
              id="emailInput"
              className="form-control form-control-lg"
              placeholder="seuemail@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="passwordInput" className="form-label fw-medium text-custom-dark">Senha</label>
            <input
              type="password"
              id="passwordInput"
              className="form-control form-control-lg"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-grid my-4">
            <button type="submit" className="btn btn-custom-green btn-lg">
              Entrar
            </button>
          </div>
        </form>
        <p className="text-center text-custom-secondary">
          <Link to="/esqueci-senha" className="link-custom">Esqueci minha senha</Link>
        </p>
        <p className="text-center text-custom-secondary">
          Ainda não tem conta? <Link to="/cadastro" className="link-custom">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;