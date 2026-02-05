import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ShopMaster Dashboard',
  description: 'Premium Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <Sidebar />
          <main style={{ 
            flex: 1, 
            marginLeft: 'var(--sidebar-width)',
            minHeight: '100vh',
            padding: '40px',
            backgroundColor: 'var(--bg-color)'
          }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
