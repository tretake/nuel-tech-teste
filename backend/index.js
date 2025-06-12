require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const { z } = require('zod');

const bcrypt = require('bcryptjs');
const { generateToken } = require('./utils/auth');
const authMiddleware = require('./middlewares/authMiddleware');

const prisma = new PrismaClient();
const app = express();
const port = 3000;




app.use(express.json());
app.use(cors());

// validações API
const productSchema = z.object({
  name: z.string().trim().min(1, 'Nome é obrigatório'),
  description: z.string().trim().optional().nullable(),
  price: z.number().positive('Preço deve ser maior que zero'),
  category: z.string().trim().min(1, 'Categoria é obrigatório'),
  stock: z.number().int().nonnegative('Estoque não pode ser negativo'),
});


app.get('/products',authMiddleware, async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
}); 


app.post('/products',authMiddleware, async (req, res) => {
  try {
    const validatedData  = productSchema.parse(req.body);
    const product  = await prisma.product.create({
      data: validatedData,
    })
    res.status(201).json(product);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Erro de validação', details: err.errors });
    }
    res.status(500).json({ error: 'Erro ao criar produto', details: err.message });
  }
});


app.put('/products/:id',authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

    const validatedData = productSchema.parse(req.body);

    const updated = await prisma.product.update({
      where: { id },
      data: validatedData,
    });

    res.json(updated);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Erro de validação', details: err.errors });
    }
    res.status(400).json({ error: 'Erro ao atualizar produto', details: err.message });
  }
});




app.delete('/products/:id',authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

    await prisma.product.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: 'Erro ao deletar produto', details: err.message });
  }
});




app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    const token = generateToken(user);
    res.json({ user: { id: user.id, email: user.email }, token });
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar usuário', details: err.message });
  }
});

app.post('/signin', async (req, res) => {
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
