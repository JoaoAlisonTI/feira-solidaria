const authMiddleware = (req, res, next) => {
  const usuarioAutenticado = true; // simulação de autenticação

  if (usuarioAutenticado) {
    next();  
  } else {
    res.status(401).send("Acesso negado. Faça login para continuar.");
  }
};

module.exports = authMiddleware;
