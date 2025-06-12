const express = require('express');
const { z } = require('zod');
const authMiddleware = require('../middlewares/authMiddleware');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

const productSchema = z.object({
  name: z.string().trim().min(1, 'Nome é obrigatório'),
  description: z.string().trim().optional().nullable(),
  price: z.number().positive('Preço deve ser maior que zero'),
  category: z.string().trim().min(1, 'Categoria é obrigatório'),
  stock: z.number().int().nonnegative('Estoque não pode ser negativo'),
});

// GET all products
router.get('/', authMiddleware, async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

// POST new product
router.post('/', authMiddleware, async (req, res) => {
  try {
    const validatedData = productSchema.parse(req.body);
    const product = await prisma.product.create({ data: validatedData });
    res.status(201).json(product);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Erro de validação', details: err.errors });
    }
    res.status(500).json({ error: 'Erro ao criar produto', details: err.message });
  }
});

// PUT update product
router.put('/:id', authMiddleware, async (req, res) => {
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

// DELETE product
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

    await prisma.product.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: 'Erro ao deletar produto', details: err.message });
  }
});

module.exports = router;