require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const { generateToken } = require('./utils/auth');
const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes');

const prisma = new PrismaClient();
const app = express();
const port = 3000;


app.use(express.json());
app.use(cors());



app.use('/products', productRoutes);
app.use('/users', userRoutes);


//login (criar nova seção)
app.post('/sessions', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Usuário não encontrado' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Senha incorreta' });

    const token = generateToken(user);
    res.json({ user: { id: user.id, email: user.email }, token });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao autenticar usuário', details: err.message });
  }
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
}); 
