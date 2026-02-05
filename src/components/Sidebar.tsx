'use client';

import { useState } from 'react';
import { LayoutGrid, Users, Code, Server, FileCode, Settings, LogOut, Menu, X, MessageSquare } from 'lucide-react';
import styles from './Sidebar.module.css';
import Link from 'next/link';
import Image from 'next/image';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const menu = [
    { name: 'Dashboard', icon: LayoutGrid, active: true, href: '/dashboard' },
    { name: 'Projects', icon: Code, active: false, href: '/projects' },
    { name: 'Services', icon: Server, active: false, href: '/services' },
    { name: 'Clients', icon: Users, active: false, href: '/clients' },
    { name: 'Resources', icon: FileCode, active: false, href: '/resources' },
    { name: 'Support', icon: MessageSquare, active: false, href: '/support' },
    { name: 'Settings', icon: Settings, active: false, href: '/settings' },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/';
    } catch (err) {
      console.error('Logout failed:', err);
      window.location.href = '/';
    }
  };

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.logo}>
        <Image
          src="/kivoc-logo.png"
          alt="Kivoc Dynamic Technology"
          width={40}
          height={40}
          className={styles.logoImage}
        />
        <div className={styles.logoText}>
          <span className={styles.logoName}>Kivoc</span>
          <span className={styles.logoTagline}>Dynamic Tech</span>
        </div>
      </div>

      <nav className={styles.menu}>
        {menu.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`${styles.item} ${item.active ? styles.active : ''}`}
            onClick={onClose}
          >
            <item.icon className={styles.icon} />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className={styles.footer}>
        <div onClick={handleLogout} className={styles.item} style={{ cursor: 'pointer' }}>
          <LogOut className={styles.icon} />
          <span>Logout</span>
        </div>
      </div>
    </aside>
  );
}

