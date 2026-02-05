import Header from '@/components/Header';
import styles from './page.module.css';
import AgentInterface from '@/components/AgentInterface';
import prisma from '@/lib/prisma';

// Ensure seed data exists
async function ensureSupportData() {
  const ticketCount = await prisma.supportTicket.count();
  if (ticketCount === 0) {
    try {
      // Get or create a client
      let client = await prisma.client.findFirst();
      if (!client) {
          client = await prisma.client.create({
              data: {
                  name: 'Demo Client',
                  email: 'demo@example.com',
                  company: 'Demo Corp',
                  phone: '+1 555 0199'
              }
          });
      }

      // Create some tickets
      await prisma.supportTicket.create({
          data: {
              subject: 'Cannot access dashboard',
              status: 'Open',
              priority: 'High',
              category: 'Technical',
              clientId: client.id,
              notes: {
                  create: [
                      { content: 'I am getting a 403 error when trying to login.', type: 'Note', author: 'Customer' },
                      { content: 'Ticket assigned to Agent queue.', type: 'System', author: 'System' }
                  ]
              }
          }
      });

      await prisma.supportTicket.create({
          data: {
              subject: 'Billing Question',
              status: 'Open',
              priority: 'Medium',
              category: 'Billing',
              clientId: client.id,
              notes: {
                  create: [
                      { content: 'Can I get an invoice for last month?', type: 'Note', author: 'Customer' }
                  ]
              }
          }
      });

    } catch (e) {
      console.error("Auto-seed support failed:", e);
    }
  }
}

export default async function SupportPage() {
  await ensureSupportData();

  const tickets = await prisma.supportTicket.findMany({
    include: {
      client: true,
      notes: {
        orderBy: { createdAt: 'asc' }
      }
    },
    orderBy: { updatedAt: 'desc' }
  });

  return (
    <div className={styles.container}>
      <Header title="Call Center Agent" />
      
      <div className={styles.header}>
        <div>
           <p style={{ color: 'var(--text-secondary)' }}>Manage client support tickets and inquiries.</p>
        </div>
        <button className="btn btn-primary">
            + New Ticket
        </button>
      </div>

      <AgentInterface tickets={tickets} />
    </div>
  );
}
