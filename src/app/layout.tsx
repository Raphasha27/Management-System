'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import { Menu } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        <title>Kivoc Dynamic Technology - IT Solutions & Services</title>
        <meta name="description" content="Professional IT services for businesses - Software Development, Web Solutions & More" />
      </head>
      <body className={inter.className}>
        {/* Mobile Overlay */}
        {sidebarOpen && (
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

        {/* Mobile Menu Button */}
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

        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main style={{ 
            flex: 1, 
            marginLeft: 'var(--sidebar-width)',
            minHeight: '100vh',
            padding: '40px',
            backgroundColor: 'var(--bg-color)',
            transition: 'margin-left 0.3s ease',
          }}
          className="main-content"
          >
            {children}
          </main>
        </div>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Hide Next.js development indicator
              (function() {
                const hideIndicator = () => {
                  const indicator = document.querySelector('nextjs-portal');
                  if (indicator) {
                    indicator.style.display = 'none';
                  }
                  // Also target the shadow DOM
                  const allElements = document.querySelectorAll('*');
                  allElements.forEach(el => {
                    if (el.shadowRoot) {
                      const style = document.createElement('style');
                      style.textContent = ':host { display: none !important; }';
                      el.shadowRoot.appendChild(style);
                    }
                  });
                };
                
                // Run immediately and on DOM ready
                hideIndicator();
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', hideIndicator);
                } else {
                  hideIndicator();
                }
                
                // Keep checking for new indicators
                setInterval(hideIndicator, 500);
              })();
            `,
          }}
        />

        <style jsx>{`
          @media (max-width: 768px) {
            .main-content {
              margin-left: 0 !important;
              padding: 80px 20px 20px 20px !important;
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
