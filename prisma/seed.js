const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding Kivoc Dynamic Technology data...');
  
  // Create Clients
  const clients = await Promise.all([
    prisma.client.upsert({
      where: { email: 'john@techcorp.com' },
      update: {},
      create: {
        name: 'John Smith',
        email: 'john@techcorp.com',
        company: 'TechCorp Solutions',
        phone: '+1-555-0101',
      },
    }),
    prisma.client.upsert({
      where: { email: 'sarah@innovate.com' },
      update: {},
      create: {
        name: 'Sarah Johnson',
        email: 'sarah@innovate.com',
        company: 'Innovate Digital',
        phone: '+1-555-0102',
      },
    }),
    prisma.client.upsert({
      where: { email: 'mike@startup.io' },
      update: {},
      create: {
        name: 'Mike Chen',
        email: 'mike@startup.io',
        company: 'StartUp.io',
        phone: '+1-555-0103',
      },
    }),
  ]);

  console.log('Created clients:', clients.length);

  // Create Services
  const servicesData = [
    { name: 'Custom Web Development', category: 'Web Development', description: 'Full-stack web applications with modern frameworks', price: 45000.0 },
    { name: 'Mobile App Development', category: 'Software Development', description: 'iOS and Android native applications', price: 85000.0 },
    { name: 'Cloud Migration', category: 'Cloud Services', description: 'Migrate your infrastructure to AWS/Azure/GCP', price: 35000.0 },
    { name: 'UI/UX Design', category: 'Design Services', description: 'User-centered design for web and mobile', price: 25000.0 },
    { name: 'API Development', category: 'Software Development', description: 'RESTful and GraphQL API solutions', price: 28000.0 },
    { name: 'DevOps & CI/CD', category: 'Infrastructure', description: 'Automated deployment and infrastructure management', price: 40000.0 },
    { name: 'Technical Consulting', category: 'Consulting', description: 'Expert advice on technology decisions', price: 15000.0 },
    { name: 'Database Design', category: 'Software Development', description: 'Optimized database architecture and management', price: 22000.0 },
  ];

  const services = [];
  for (const s of servicesData) {
    const service = await prisma.service.create({ data: s });
    services.push(service);
    console.log('Created service:', service.name);
  }

  // Create Projects
  const projectStatuses = ['Active', 'Completed', 'Pending', 'On Hold'];
  
  for (let i = 0; i < 8; i++) {
    const client = clients[i % clients.length];
    const status = projectStatuses[i % projectStatuses.length];
    const randomServices = services.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1);
    
    const totalBudget = randomServices.reduce((sum, s) => sum + s.price, 0);
    
    const project = await prisma.project.create({
      data: {
        name: `Project ${String.fromCharCode(65 + i)} - ${client.company}`,
        status: status,
        budget: totalBudget,
        clientId: client.id,
        startDate: new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 60))),
        endDate: status === 'Completed' ? new Date() : null,
        services: {
          create: randomServices.map(service => ({
            serviceId: service.id,
            quantity: 1,
          })),
        },
      },
    });
    
    console.log('Created project:', project.name);
  }

  console.log('Seeding finished successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error during seeding:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
