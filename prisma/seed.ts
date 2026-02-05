import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding management system data...');

  // Create Clients
  const client1 = await (prisma as any).client.upsert({
    where: { email: 'john@techcorp.com' },
    update: {},
    create: {
      name: 'John Smith',
      email: 'john@techcorp.com',
      company: 'TechCorp Solutions',
      phone: '+1-555-0101',
    },
  });

  const client2 = await (prisma as any).client.upsert({
    where: { email: 'sarah@innovate.com' },
    update: {},
    create: {
      name: 'Sarah Johnson',
      email: 'sarah@innovate.com',
      company: 'Innovate Digital',
      phone: '+1-555-0102',
    },
  });

  // Create Services
  const servicesData = [
    { name: 'Web Development', category: 'Web Development', description: 'Custom websites and web apps', price: 45000.0 },
    { name: 'Mobile App Development', category: 'Software Development', description: 'iOS and Android apps', price: 95000.0 },
    { name: 'Cloud Services', category: 'Cloud Services', description: 'AWS/Azure migration', price: 35000.0 },
    { name: 'UI/UX Design', category: 'Design Services', description: 'User-centered design', price: 25000.0 },
  ];

  for (const s of servicesData) {
    await (prisma as any).service.upsert({
      where: { id: servicesData.indexOf(s) + 1 },
      update: {},
      create: s,
    }).catch(async () => {
      await (prisma as any).service.create({ data: s });
    });
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
