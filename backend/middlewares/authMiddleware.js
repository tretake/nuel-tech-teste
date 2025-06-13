const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

// Função middleware para autenticação
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });

  const token = authHeader.split(' ')[1]; //Extrai o token do header (formato "Bearer <token>")

  try {
    const decoded = jwt.verify(token, SECRET);// decodifica e Verifica o token usando a chave secreta
    req.user = decoded; //dados do usuario
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}

module.exports = authMiddleware;
