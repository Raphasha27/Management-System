const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');
  
  // Create User
  const user = await prisma.user.upsert({
    where: { email: 'admin@shopmaster.com' },
    update: {},
    create: {
      email: 'admin@shopmaster.com',
      name: 'Admin User',
      role: 'admin',
    },
  });

  console.log('User created:', user);

  // Create Products
  const productsData = [
    { name: 'Wireless Headphones', price: 120.0, stock: 50, category: 'Electronics', image: 'headphones.jpg' },
    { name: 'Smart Watch', price: 199.99, stock: 30, category: 'Electronics', image: 'watch.jpg' },
    { name: 'Ergonomic Chair', price: 250.0, stock: 15, category: 'Furniture', image: 'chair.jpg' },
    { name: 'Running Shoes', price: 89.99, stock: 100, category: 'Apparel', image: 'shoes.jpg' },
    { name: 'Mechanical Keyboard', price: 150.0, stock: 25, category: 'Electronics', image: 'keyboard.jpg' },
  ];

  for (const p of productsData) {
    const product = await prisma.product.create({
      data: p,
    });
    console.log('Created product:', product.name);
  }

  // Create Orders
  const products = await prisma.product.findMany();
  
  for (let i = 0; i < 10; i++) {
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    const quantity = Math.floor(Math.random() * 3) + 1;
    const total = randomProduct.price * quantity;

    await prisma.order.create({
      data: {
        userId: user.id,
        status: ['Pending', 'Shipped', 'Delivered'][Math.floor(Math.random() * 3)],
        total: total,
        createdAt: new Date(new Date().setDate(new Date().getDate() - i)),
        items: {
          create: {
            productId: randomProduct.id,
            quantity: quantity,
          },
        },
      },
    });
    console.log('Created order');
  }

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
