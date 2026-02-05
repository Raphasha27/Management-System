import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight, Shield, Zap, BarChart3, Globe } from 'lucide-react';
import styles from './landing.module.css';

export default function LandingPage() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src="/kivoc-logo.png" alt="Kivoc Logo" width={32} height={32} />
          <span>Kivoc Dynamic Technology</span>
        </div>
        <Link href="/login" className={styles.loginBtn}>Login</Link>
      </header>

      <main className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>Next-Gen IT Management</div>
          <h1>Manage Your <span>IT Empire</span> with Intelligence</h1>
          <p>
            Experience the most powerful management system for IT service providers. 
            Track projects, manage clients, and handle support tickets—all in one beautiful interface.
          </p>
          <div className={styles.ctaGroup}>
            <Link href="/login" className={styles.primaryBtn}>
              Get Started Free <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <div className={styles.features}>
          <div className={styles.featureCard}>
            <BarChart3 className={styles.featIcon} />
            <h3>Real-time Analytics</h3>
            <p>Monitor revenue and growth with interactive charts and live stats.</p>
          </div>
          <div className={styles.featureCard}>
            <Shield className={styles.featIcon} />
            <h3>Secure Infrastructure</h3>
            <p>Enterprise-grade security for your clients' sensitive data and projects.</p>
          </div>
          <div className={styles.featureCard}>
            <Zap className={styles.featIcon} />
            <h3>AI-Powered</h3>
            <p>Intelligent assistant to help you navigate and manage your business faster.</p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© 2026 Kivoc Dynamic Technology. All rights reserved.</p>
      </footer>
    </div>
  );
}
