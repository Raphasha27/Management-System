import Header from '@/components/Header';
export const dynamic = 'force-dynamic';
import styles from './page.module.css';
import { SalesChart, ServiceDistributionChart } from '@/components/Charts';
import prisma from '@/lib/prisma';
import { DollarSign, Users, Code, TrendingUp } from 'lucide-react';
import { MOCK_PROJECTS, MOCK_SERVICES, MOCK_CLIENTS } from '@/lib/mockData';

async function ensureData() {
  try {
    const clientCount = await (prisma as any).client.count();
    // Auto-seeding logic...
  } catch (e) {
    // Ignore seeding errors in production
  }
}

async function getStats() {
  try {
    const projects = await (prisma as any).project.findMany({ include: { services: true } });
    const totalRevenue = projects.reduce((sum: number, p: { budget: number }) => sum + p.budget, 0);
    const activeProjects = projects.filter((p: { status: string }) => p.status === 'Active').length;
    const clientCount = await (prisma as any).client.count();

    return [
      { label: 'Total Revenue', value: `R ${totalRevenue.toLocaleString()}`, growth: '+18.2%', isPositive: true, icon: DollarSign, color: '#2563EB' },
      { label: 'Active Projects', value: activeProjects.toString(), growth: '+12.5%', isPositive: true, icon: Code, color: '#10B981' },
      { label: 'Total Clients', value: clientCount.toString(), growth: '+8.3%', isPositive: true, icon: Users, color: '#F59E0B' },
    ];
  } catch (e) {
    // Fallback to Mocks
    return [
      { label: 'Total Revenue', value: `R 285,000`, growth: '+18.2%', isPositive: true, icon: DollarSign, color: '#2563EB' },
      { label: 'Active Projects', value: '12', growth: '+12.5%', isPositive: true, icon: Code, color: '#10B981' },
      { label: 'Total Clients', value: '8', growth: '+8.3%', isPositive: true, icon: Users, color: '#F59E0B' },
    ];
  }
}

async function getRecentProjects() {
  try {
    return await (prisma as any).project.findMany({
      take: 5,
      orderBy: { startDate: 'desc' },
      include: { client: true }
    });
  } catch (e) {
    return MOCK_PROJECTS;
  }
}

async function getTopServices() {
  try {
    return await (prisma as any).service.findMany({
      take: 4,
      orderBy: { price: 'desc' }
    });
  } catch (e) {
    return MOCK_SERVICES;
  }
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

        <div className={styles.chartsGrid}>
          <div className={styles.chartCard}><div className={styles.cardHeader}><div className={styles.cardTitle}>Monthly Revenue</div></div><SalesChart data={[]} /></div>
          <div className={styles.chartCard}><div className={styles.cardHeader}><div className={styles.cardTitle}>Services Distribution</div></div><ServiceDistributionChart /></div>
        </div>

        <div className={styles.bottomGrid}>
          <div className={styles.chartCard}>
            <div className={styles.cardHeader}><div className={styles.cardTitle}>Popular Services</div></div>
            <div className={styles.productList}>
              {topServices.map((service: any) => (
                <div key={service.id} className={styles.productItem}>
                  <div className={styles.serviceIcon} style={{ background: '#2563EB15', color: '#2563EB' }}><Code size={20} /></div>
                  <div className={styles.productInfo}><h4>{service.name}</h4><span>{service.category}</span></div>
                  <div style={{ marginLeft: 'auto', fontWeight: 700, color: 'var(--primary)' }}>R {service.price.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.chartCard} style={{ overflow: 'hidden' }}>
            <div className={styles.cardHeader}><div className={styles.cardTitle}>Recent Projects</div></div>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead><tr><th>Project</th><th>Client</th><th>Start Date</th><th>Status</th><th>Budget</th></tr></thead>
                <tbody>
                  {recentProjects.map((project: any) => (
                    <tr key={project.id}>
                      <td>{project.name}</td>
                      <td>{project.client?.company || project.client?.name}</td>
                      <td>{new Date(project.startDate).toLocaleDateString()}</td>
                      <td><span className={`${styles.status} ${styles[project.status.toLowerCase().replace(' ', '')] || ''}`}>{project.status}</span></td>
                      <td style={{ fontWeight: 700 }}>R {project.budget.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
