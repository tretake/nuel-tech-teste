const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const newProduct = await prisma.product.create({
    data: {
      name: 'T-shirt',
      description: 'Cotton T-shirt',
      price: 29.99,
      category: 'Clothing',
      stock: 100,
    },
  });

  console.log('Created product:', newProduct);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
