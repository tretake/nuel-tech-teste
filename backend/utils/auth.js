const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

// Função para gerar um token JWT
function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' });
}

module.exports = { generateToken };
