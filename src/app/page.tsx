import Header from '@/components/Header';
export const dynamic = 'force-dynamic';
import styles from './page.module.css';
import { SalesChart, ServiceDistributionChart } from '@/components/Charts';
import prisma from '@/lib/prisma';
import { DollarSign, Users, Code, TrendingUp, CheckCircle } from 'lucide-react';

// Auto-seed function
async function ensureData() {
  const clientCount = await (prisma as any).client.count();
  if (clientCount === 0) {
    try {
      // Create Clients
      const client1 = await (prisma as any).client.create({
        data: {
          name: 'John Smith',
          email: 'john@techcorp.com',
          company: 'TechCorp Solutions',
          phone: '+1-555-0101',
        },
      });

      const client2 = await (prisma as any).client.create({
        data: {
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
        await (prisma as any).service.create({ data: s });
      }

      const services = await (prisma as any).service.findMany();

      // Create Projects
      const statuses = ['Active', 'Completed', 'Pending', 'On Hold'];
      for (let i = 0; i < 6; i++) {
        const service = services[i % services.length];
        await (prisma as any).project.create({
          data: {
            name: `Project ${String.fromCharCode(65 + i)}`,
            status: statuses[i % statuses.length],
            budget: service.price,
            clientId: i % 2 === 0 ? client1.id : client2.id,
            startDate: new Date(new Date().setDate(new Date().getDate() - i * 10)),
            services: {
              create: {
                serviceId: service.id,
                quantity: 1,
              },
            },
          },
        });
      }

      console.log('Auto-seeding completed');
    } catch (e) {
      console.error("Auto-seeding failed:", e);
    }
  }
}

async function getStats() {
  const projects = await (prisma as any).project.findMany({ include: { services: true } });
  const totalRevenue = projects.reduce((sum: number, p: { budget: number }) => sum + p.budget, 0);
  const activeProjects = projects.filter((p: { status: string }) => p.status === 'Active').length;
  const clientCount = await (prisma as any).client.count();

  return [
    { 
      label: 'Total Revenue', 
      value: `R ${totalRevenue.toLocaleString()}`, 
      growth: '+18.2%', 
      isPositive: true, 
      icon: DollarSign, 
      color: '#2563EB' 
    },
    { 
      label: 'Active Projects', 
      value: activeProjects.toString(), 
      growth: '+12.5%', 
      isPositive: true, 
      icon: Code, 
      color: '#10B981' 
    },
    { 
      label: 'Total Clients', 
      value: clientCount.toString(), 
      growth: '+8.3%', 
      isPositive: true, 
      icon: Users, 
      color: '#F59E0B' 
    },
  ];
}

async function getRecentProjects() {
  return await (prisma as any).project.findMany({
    take: 5,
    orderBy: { startDate: 'desc' },
    include: { client: true }
  });
}

async function getTopServices() {
  return await (prisma as any).service.findMany({
    take: 4,
    orderBy: { price: 'desc' }
  });
}


export default async function Home() {
  await ensureData();
  
  const stats = await getStats();
  const recentProjects = await getRecentProjects();
  const topServices = await getTopServices();

  return (
    <div>
      <Header title="Dashboard Overview" />
      
      <div className={styles.dashboard}>
        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          {stats.map((stat, i) => (
            <div key={i} className={styles.statCard}>
              <div className={styles.statInfo}>
                <h3>{stat.label}</h3>
                <h2>{stat.value}</h2>
                <div className={`${styles.growth} ${stat.isPositive ? styles.positive : styles.negative}`}>
                  <TrendingUp size={14} />
                  {stat.growth} from last month
                </div>
              </div>
              <div className={styles.statIcon} style={{ background: `${stat.color}15`, color: stat.color }}>
                <stat.icon size={24} />
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className={styles.chartsGrid}>
          <div className={styles.chartCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>Monthly Revenue</div>
              <button className="btn btn-outline" style={{ fontSize: '12px', padding: '6px 12px' }}>
                View Report
              </button>
            </div>
            <SalesChart data={[]} /> 
          </div>
          <div className={styles.chartCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>Services Distribution</div>
            </div>
            <ServiceDistributionChart />
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottomGrid}>
          {/* Top Services */}
          <div className={styles.chartCard}>
             <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>Popular Services</div>
            </div>
            <div className={styles.productList}>
              {topServices.map((service: { id: number; name: string; category: string; price: number }) => (
                <div key={service.id} className={styles.productItem}>
                  <div className={styles.serviceIcon} style={{ background: '#2563EB15', color: '#2563EB' }}>
                    <Code size={20} />
                  </div>
                  <div className={styles.productInfo}>
                    <h4>{service.name}</h4>
                    <span>{service.category}</span>
                  </div>
                  <div style={{ marginLeft: 'auto', fontWeight: 700, color: 'var(--primary)' }}>
                    R {service.price.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Projects */}
          <div className={styles.chartCard}>
             <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>Recent Projects</div>
              <button className="btn btn-primary" style={{ fontSize: '12px', padding: '6px 12px' }}>
                New Project
              </button>
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Client</th>
                  <th>Start Date</th>
                  <th>Status</th>
                  <th>Budget</th>
                </tr>
              </thead>
              <tbody>
                {recentProjects.map((project: { id: number; name: string; client: { company: string | null; name: string } | null; startDate: Date; status: string; budget: number }) => (
                  <tr key={project.id}>
                    <td>{project.name}</td>
                    <td>{project.client?.company || project.client?.name}</td>
                    <td>{project.startDate.toLocaleDateString()}</td>
                    <td>
                      <span className={`${styles.status} ${styles[project.status.toLowerCase().replace(' ', '')] || ''}`}>
                        {project.status}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700 }}>R {project.budget.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
