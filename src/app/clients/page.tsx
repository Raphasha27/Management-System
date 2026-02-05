import Header from '@/components/Header';
import styles from './clients.module.css';
import prisma from '@/lib/prisma';
import { Users, Mail, Phone, Building, ExternalLink, Plus } from 'lucide-react';

async function getClients() {
  return await prisma.client.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { projects: true, tickets: true } } }
  });
}

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <div>
      <Header title="Clients Management" />
      
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.info}>
            <h2>All Clients</h2>
            <p>Manage your client relationships and contact information.</p>
          </div>
          <button className="btn btn-primary">
            <Plus size={18} />
            <span>Add Client</span>
          </button>
        </div>

        <div className={styles.grid}>
          {clients.map((client) => (
            <div key={client.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.avatar}>
                  {client.name.charAt(0)}
                </div>
                <div className={styles.nameHeader}>
                  <h3>{client.name}</h3>
                  <span>ID: #{client.id}</span>
                </div>
              </div>

              <div className={styles.details}>
                <div className={styles.detailItem}>
                  <Building size={16} />
                  <span>{client.company || 'Private Individual'}</span>
                </div>
                <div className={styles.detailItem}>
                  <Mail size={16} />
                  <span>{client.email}</span>
                </div>
                <div className={styles.detailItem}>
                  <Phone size={16} />
                  <span>{client.phone || 'No phone provided'}</span>
                </div>
              </div>

              <div className={styles.stats}>
                <div className={styles.stat}>
                  <span className={styles.statValue}>{client._count.projects}</span>
                  <span className={styles.statLabel}>Projects</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>{client._count.tickets}</span>
                  <span className={styles.statLabel}>Tickets</span>
                </div>
              </div>

              <button className={styles.viewButton}>
                <span>View Details</span>
                <ExternalLink size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
