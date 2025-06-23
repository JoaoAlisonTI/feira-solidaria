import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="d-flex align-items-center justify-content-between px-5 py-3 border-custom-bottom">
      <Link to="/" className="d-flex align-items-center gap-3 text-decoration-none text-custom-dark">
        <div style={{ width: '1rem', height: '1rem' }}>
          {/* Novo SVG do protótipo */}
          <svg viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" />
          </svg>
        </div>
        <h2 className="h5 fw-bold m-0">Feira Solidária</h2>
      </Link>
      
      <div className="d-flex align-items-center gap-4">
        <nav className="d-none d-md-flex align-items-center gap-4">
          <Link className="text-custom-dark text-decoration-none" to="/">Início</Link>
          <Link className="text-custom-dark text-decoration-none" to="/doacoes">Doações</Link>
          <Link className="text-custom-dark text-decoration-none" to="/como-funciona">Como Funciona</Link>
          <Link className="text-custom-dark text-decoration-none" to="/contato">Contato</Link>
        </nav>
        <button
          onClick={() => navigate('/login')}
          className="btn btn-custom-green rounded-custom px-4"
        >
          Entrar
        </button>
      </div>
    </header>
  );
}

export default Header;