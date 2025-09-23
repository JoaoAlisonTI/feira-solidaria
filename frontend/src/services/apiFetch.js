// src/services/apiFetch.js
export async function authenticatedFetch(url, options = {}) {
  const token = localStorage.getItem('token');
  
  // Define os cabeçalhos padrão
  const headers = { ...options.headers };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Se o corpo NÃO for FormData, define o Content-Type como JSON.
  // O navegador definirá o Content-Type correto para FormData automaticamente.
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
  const fullUrl = `${BASE}${url}`;


  const response = await fetch(fullUrl, {
    ...options,
    headers,
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.error || 'Ocorreu um erro na requisição');
  }

  return responseData;
}