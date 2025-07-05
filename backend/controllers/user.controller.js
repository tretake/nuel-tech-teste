const { z } = require('zod');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/auth');

const prisma = new PrismaClient();

//zod para validação
const userSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().trim().min(1, 'senha é obrigatória'),
});

// criar novo usuario (cadastro)
exports.registerUser = async (req, res) => {
  try {
    const { email, password } = userSchema.parse(req.body);


    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // Gera o hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);
    // Cria o usuário no banco de dados com o email e senha hasheada
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    // Gera um token JWT para o novo usuário
    const token = generateToken(user);

    res.json({ user: { id: user.id, email: user.email }, token });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Erro de validação', details: err.errors });
    }
    res.status(400).json({ error: 'Erro ao criar usuário', details: err.message });
  }
};
