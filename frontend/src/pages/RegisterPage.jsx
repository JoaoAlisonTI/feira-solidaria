// src/pages/RegisterPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authenticatedFetch } from '../services/apiFetch'; // <- IMPORTAÇÃO NOVA

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    try {
      await authenticatedFetch('/usuarios', {
        method: 'POST',
        body: JSON.stringify({ nome: name, email, senha: password }),
      });

      alert('Conta criada com sucesso!');
      navigate('/login');
    } catch (error) {
      alert(error.message || 'Erro ao criar conta.');
    }
  };

  // ... o resto do seu código JSX continua igual ...
  return (
    <div className="container d-flex justify-content-center py-5">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <h2 className="h3 fw-bold text-center my-4 text-custom-dark">Criar uma conta</h2>
        <form onSubmit={handleRegister} className="px-4">
          {/* Seus inputs de formulário aqui */}
          <div className="mb-3">
            <label className="form-label fw-medium text-custom-dark">Nome</label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-medium text-custom-dark">Email</label>
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-medium text-custom-dark">Senha</label>
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-medium text-custom-dark">Confirmar Senha</label>
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Confirmar Senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-grid my-4">
            <button type="submit" className="btn btn-custom-green btn-lg rounded-custom">
              Cadastrar
            </button>
          </div>
        </form>
        <p className="text-center text-custom-secondary">
          Já tem uma conta? <Link to="/login" className="link-custom fw-bold">Entrar</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;