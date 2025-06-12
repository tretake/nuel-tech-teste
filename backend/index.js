const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const { z } = require('zod');

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


app.get('/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
}); 


app.post('/products', async (req, res) => {
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


app.put('/products/:id', async (req, res) => {
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




app.delete('/products/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

    await prisma.product.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: 'Erro ao deletar produto', details: err.message });
  }
});





app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
}); 
