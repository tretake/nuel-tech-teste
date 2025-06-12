const express = require('express');
const { z } = require('zod');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/auth');

const router = express.Router();


const userSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().trim().min(1, 'senha é obrigatório')
});


// criar novo usuario (cadastro)
router.post('/', async (req, res) => {
  try {
    const { email, password } = userSchema.parse(req.body);

    
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    const token = generateToken(user);
    res.json({ user: { id: user.id, email: user.email }, token });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Erro de validação', details: err.errors });
    }
    res.status(400).json({ error: 'Erro ao criar usuário', details: err.message });
  }
});

module.exports = router;