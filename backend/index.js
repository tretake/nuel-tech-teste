const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();
const port = 3000;




app.use(express.json());
app.use(cors());

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
    const { name, description, price, category, stock } = req.body;
    const product = await prisma.product.create({
      data: { name, description, price, category, stock },
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar produto' });
  }
}); 




app.put('/products/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, description, price, category, stock } = req.body;

    const updated = await prisma.product.update({
      where: { id },
      data: { name, description, price, category, stock },
    });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar produto' });
  }
}); 




app.delete('/products/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.product.delete({ where: { id } });
    res.status(204).send(); 
  } catch (err) {
    res.status(400).json({ error: 'Erro ao deletar produto' });
  }
}); 




app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
}); 
