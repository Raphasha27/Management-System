'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import AIAssistant from '@/components/AIAssistant';
import { Menu } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Paths that should NOT have the sidebar/dashboard layout
  const isAuthPage = pathname === '/' || pathname === '/login';

  return (
    <html lang="en">
      <head>
        <title>Kivoc Dynamic Technology - IT Solutions & Services</title>
        <meta name="description" content="Professional IT services for businesses - Software Development, Web Solutions & More" />
      </head>
      <body className={inter.className}>
        {/* Mobile Overlay */}
        {!isAuthPage && sidebarOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 999,
            }}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Mobile Menu Button - Hide on Auth pages */}
        {!isAuthPage && (
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              position: 'fixed',
              top: '20px',
              left: '20px',
              zIndex: 1001,
              background: 'var(--primary)',
              border: 'none',
              borderRadius: '10px',
              padding: '12px',
              cursor: 'pointer',
              display: 'none',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
            }}
            className="mobile-menu-btn"
          >
            <Menu size={24} color="white" />
          </button>
        )}

        <div className="flex">
          {!isAuthPage && <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />}
          <main style={{
            flex: 1,
            marginLeft: isAuthPage ? '0' : 'var(--sidebar-width)',
            minHeight: '100vh',
            padding: isAuthPage ? '0' : '40px',
            backgroundColor: 'var(--bg-color)',
            transition: 'all 0.3s ease',
            width: '100%',
            overflowX: 'hidden'
          }}
            className="main-content"
          >
            {children}
          </main>
        </div>

        {/* AI Assistant - Show everywhere except maybe just specific pages if desired */}
        <AIAssistant />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const hideIndicator = () => {
                  const indicator = document.querySelector('nextjs-portal');
                  if (indicator) {
                    indicator.style.display = 'none';
                  }
                  const allElements = document.querySelectorAll('*');
                  allElements.forEach(el => {
                    if (el.shadowRoot) {
                      const style = document.createElement('style');
                      style.textContent = ':host { display: none !important; }';
                      el.shadowRoot.appendChild(style);
                    }
                  });
                };
                hideIndicator();
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', hideIndicator);
                } else {
                  hideIndicator();
                }
                setInterval(hideIndicator, 500);
              })();
            `,
          }}
        />

        <style jsx>{`
          @media (max-width: 768px) {
            .main-content {
              margin-left: 0 !important;
              padding: ${isAuthPage ? '0' : '80px 16px 24px 16px'} !important;
            }
            :global(.mobile-menu-btn) {
              display: block !important;
            }
          }
        `}</style>
      </body>
    </html>
  );
}

