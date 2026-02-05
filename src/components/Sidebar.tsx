'use client';

import { LayoutGrid, ShoppingBag, Users, Folder, CreditCard, Settings, LogOut, MessageSquare, BarChart2 } from 'lucide-react';
import styles from './Sidebar.module.css';
import Link from 'next/link';

export default function Sidebar() {
  const menu = [
    { name: 'Overview', icon: LayoutGrid, active: true, href: '/' },
    { name: 'Orders', icon: ShoppingBag, active: false, href: '#' },
    { name: 'Products', icon: Folder, active: false, href: '#' },
    { name: 'Customers', icon: Users, active: false, href: '#' },
    { name: 'Analytics', icon: BarChart2, active: false, href: '#' },
    { name: 'Payments', icon: CreditCard, active: false, href: '#' },
    { name: 'Settings', icon: Settings, active: false, href: '#' },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div style={{ width: 32, height: 32, background: 'var(--primary)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>S</div>
        ShopMaster
      </div>
      
      <nav className={styles.menu}>
        {menu.map((item) => (
          <Link key={item.name} href={item.href} className={`${styles.item} ${item.active ? styles.active : ''}`}>
            <item.icon className={styles.icon} />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className={styles.footer}>
         <div className={styles.item}>
            <LogOut className={styles.icon} />
            <span>Logout</span>
         </div>
      </div>
    </aside>
  );
}
