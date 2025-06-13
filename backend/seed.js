const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


//script para inserir produtos no banco
async function main() {
  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Camiseta',
        description: 'Camiseta 100% algodão',
        price: 29.99,
        category: 'Roupas',
        stock: 100,
      },
      {
        name: 'Tênis Esportivo',
        description: 'Confortável para corrida',
        price: 199.90,
        category: 'Calçados',
        stock: 50,
      },
      {
        name: 'Caneca',
        description: 'Caneca de porcelana com estampa personalizada',
        price: 24.90,
        category: 'Cozinha',
        stock: 80,
      },
      {
        name: 'Notebook',
        description: 'Notebook com 8GB RAM e SSD 256GB',
        price: 3299.00,
        category: 'Eletrônicos',
        stock: 20,
      },
      {
        name: 'Fone de Ouvido',
        description: 'Fone Bluetooth com cancelamento de ruído',
        price: 149.90,
        category: 'Acessórios',
        stock: 75,
      },
      {
        name: 'Mochila',
        description: 'Mochila escolar resistente à água',
        price: 89.00,
        category: 'Acessórios',
        stock: 60,
      },
      {
        name: 'Camiseta',
        description: 'Camiseta 100% algodão',
        price: 29.99,
        category: 'Roupas',
        stock: 100,
      },
      {
        name: 'Tênis Esportivo',
        description: 'Confortável para corrida',
        price: 199.90,
        category: 'Calçados',
        stock: 50,
      },
      {
        name: 'Caneca',
        description: 'Caneca de porcelana com estampa personalizada',
        price: 24.90,
        category: 'Cozinha',
        stock: 80,
      },
      {
        name: 'Notebook',
        description: 'Notebook com 8GB RAM e SSD 256GB',
        price: 3299.00,
        category: 'Eletrônicos',
        stock: 20,
      },
      {
        name: 'Fone de Ouvido',
        description: 'Fone Bluetooth com cancelamento de ruído',
        price: 149.90,
        category: 'Acessórios',
        stock: 75,
      },
      {
        name: 'Mochila',
        description: 'Mochila escolar resistente à água',
        price: 89.00,
        category: 'Acessórios',
        stock: 60,
      },
      {
        name: 'Camiseta',
        description: 'Camiseta 100% algodão',
        price: 29.99,
        category: 'Roupas',
        stock: 100,
      },
      {
        name: 'Tênis Esportivo',
        description: 'Confortável para corrida',
        price: 199.90,
        category: 'Calçados',
        stock: 50,
      },
      {
        name: 'Caneca',
        description: 'Caneca de porcelana com estampa personalizada',
        price: 24.90,
        category: 'Cozinha',
        stock: 80,
      },
      {
        name: 'Notebook',
        description: 'Notebook com 8GB RAM e SSD 256GB',
        price: 3299.00,
        category: 'Eletrônicos',
        stock: 20,
      },
      {
        name: 'Fone de Ouvido',
        description: 'Fone Bluetooth com cancelamento de ruído',
        price: 149.90,
        category: 'Acessórios',
        stock: 75,
      },
      {
        name: 'Mochila',
        description: 'Mochila escolar resistente à água',
        price: 89.00,
        category: 'Acessórios',
        stock: 60,
      },
      {
        name: 'Camiseta',
        description: 'Camiseta 100% algodão',
        price: 29.99,
        category: 'Roupas',
        stock: 100,
      },
      {
        name: 'Tênis Esportivo',
        description: 'Confortável para corrida',
        price: 199.90,
        category: 'Calçados',
        stock: 50,
      },
      {
        name: 'Caneca',
        description: 'Caneca de porcelana com estampa personalizada',
        price: 24.90,
        category: 'Cozinha',
        stock: 80,
      },
      {
        name: 'Notebook',
        description: 'Notebook com 8GB RAM e SSD 256GB',
        price: 3299.00,
        category: 'Eletrônicos',
        stock: 20,
      },
      {
        name: 'Fone de Ouvido',
        description: 'Fone Bluetooth com cancelamento de ruído',
        price: 149.90,
        category: 'Acessórios',
        stock: 75,
      },
      {
        name: 'Mochila',
        description: 'Mochila escolar resistente à água',
        price: 89.00,
        category: 'Acessórios',
        stock: 60,
      },
      {
        name: 'Camiseta',
        description: 'Camiseta 100% algodão',
        price: 29.99,
        category: 'Roupas',
        stock: 100,
      },
      {
        name: 'Tênis Esportivo',
        description: 'Confortável para corrida',
        price: 199.90,
        category: 'Calçados',
        stock: 50,
      },
      {
        name: 'Caneca',
        description: 'Caneca de porcelana com estampa personalizada',
        price: 24.90,
        category: 'Cozinha',
        stock: 80,
      },
      {
        name: 'Notebook',
        description: 'Notebook com 8GB RAM e SSD 256GB',
        price: 3299.00,
        category: 'Eletrônicos',
        stock: 20,
      },
      {
        name: 'Fone de Ouvido',
        description: 'Fone Bluetooth com cancelamento de ruído',
        price: 149.90,
        category: 'Acessórios',
        stock: 75,
      },
      {
        name: 'Mochila',
        description: 'Mochila escolar resistente à água',
        price: 89.00,
        category: 'Acessórios',
        stock: 60,
      }
    ]
  });

  console.log('Produtos criados:', products);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
