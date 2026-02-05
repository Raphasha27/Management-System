'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push('/dashboard');
      } else {
        setError(data.message || 'Invalid credentials. Please use the mock login provided.');
        setIsLoading(false);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <Sparkles size={32} />
          </div>
          <h1>Welcome Back</h1>
          <p>Login to your Kivoc management account</p>
        </div>

        <div className={styles.mockInfo}>
          <div className={styles.mockBadge}>MOCK LOGIN</div>
          <p><strong>Email:</strong> admin@kivoc.co.za</p>
          <p><strong>Password:</strong> password123</p>
        </div>

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label><Mail size={16} /> Email Address</label>
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label><Lock size={16} /> Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className={styles.errorBox}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <button type="submit" className={styles.loginBtn} disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'} <ArrowRight size={18} />
          </button>
        </form>

        <div className={styles.footer}>
          <p>Protected by enterprise-grade security</p>
          <Link href="/privacy" className={styles.privacyLink}>Privacy Policy & Instructions</Link>
        </div>
      </div>
    </div>
  );
}
