import Header from '@/components/Header';
import styles from './page.module.css';
import { SalesChart, OrderStatusChart } from '@/components/Charts';
import prisma from '@/lib/prisma';
import { ShoppingCart, Users, DollarSign, TrendingUp, Package } from 'lucide-react';

// Lazy seed function
async function ensureData() {
  const userCount = await prisma.user.count();
  if (userCount === 0) {
    try {
      const user = await prisma.user.create({
        data: {
          email: 'admin@shopmaster.com',
          name: 'Admin User',
          role: 'admin',
        }
      });
      
      const productsData = [
        { name: 'Wireless Headphones', price: 120.0, stock: 50, category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
        { name: 'Smart Watch', price: 199.99, stock: 30, category: 'Electronics', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80' },
        { name: 'Ergonomic Chair', price: 250.0, stock: 15, category: 'Furniture', image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&q=80' },
        { name: 'Running Shoes', price: 89.99, stock: 100, category: 'Apparel', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' },
      ];

      for (const p of productsData) {
        await prisma.product.create({ data: p });
      }

      const products = await prisma.product.findMany();
      
       // Create some orders
      for (let i = 0; i < 5; i++) {
        const product = products[i % products.length];
        await prisma.order.create({
          data: {
            userId: user.id,
            status: ['Processing', 'Completed', 'Pending'][i % 3],
            total: product.price,
            items: { create: { productId: product.id, quantity: 1 } }
          }
        });
      }
    } catch (e) {
      console.error("Auto-seeding failed:", e);
    }
  }
}

async function getStats() {
  const stats = [
    { label: 'Total Revenue', value: '$128,450', growth: '+12.5%', isPositive: true, icon: DollarSign, color: '#6C5DD3' },
    { label: 'Total Orders', value: '2,340', growth: '+8.2%', isPositive: true, icon: ShoppingCart, color: '#FFCE73' },
    { label: 'Total Customers', value: '1,120', growth: '-5.7%', isPositive: false, icon: Users, color: '#FF754C' },
  ];
  return stats; 
  // In a real app, we would aggregate these from prisma.order.aggregate(...)
}

async function getRecentOrders() {
  return await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { user: true, items: true }
  });
}

async function getTopProducts() {
  return await prisma.product.findMany({
    take: 4,
    orderBy: { price: 'desc' } // Mocking "top selling" by price for now
  });
}

export default async function Home() {
  await ensureData();
  
  const stats = await getStats();
  const recentOrders = await getRecentOrders();
  const topProducts = await getTopProducts();

  return (
    <div>
      <Header title="Overview" />
      
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
              <div className={styles.cardTitle}>Sales Overview</div>
            </div>
            <SalesChart data={[]} /> 
          </div>
          <div className={styles.chartCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>Order Status</div>
            </div>
            <OrderStatusChart />
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottomGrid}>
          {/* Top Selling Products */}
          <div className={styles.chartCard}>
             <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>Top Selling Products</div>
            </div>
            <div className={styles.productList}>
              {topProducts.map(product => (
                <div key={product.id} className={styles.productItem}>
                  <img src={product.image || 'https://via.placeholder.com/50'} alt={product.name} className={styles.productImage} />
                  <div className={styles.productInfo}>
                    <h4>{product.name}</h4>
                    <span>{product.category}</span>
                  </div>
                  <div style={{ marginLeft: 'auto', fontWeight: 'bold' }}>${product.price}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className={styles.chartCard}>
             <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>Recent Orders</div>
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id}>
                    <td>#ORD-{order.id.toString().padStart(4, '0')}</td>
                    <td>{order.user?.name || 'Guest'}</td>
                    <td>{order.createdAt.toLocaleDateString()}</td>
                    <td>
                      <span className={`${styles.status} ${styles[order.status.toLowerCase()] || ''}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>${order.total}</td>
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
