import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, EyeOff, ClipboardCheck } from 'lucide-react';
import styles from './privacy.module.css';

export default function PrivacyPage() {
    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <Link href="/login" className={styles.backBtn}>
                    <ArrowLeft size={18} /> Back to Login
                </Link>
                <div className={styles.logo}>
                    <ShieldCheck size={40} color="#2563eb" />
                    <span>Kivoc Privacy Center</span>
                </div>
            </header>

            <main className={styles.content}>
                <section className={styles.hero}>
                    <h1>Privacy & Data Protection</h1>
                    <p>Your security is our highest priority. Learn how Kivoc Dynamic Technology handles your information.</p>
                </section>

                <div className={styles.grid}>
                    <div className={styles.card}>
                        <Lock className={styles.icon} />
                        <h3>Secure Authentication</h3>
                        <p>We use industry-standard HttpOnly cookies and secure session management to protect your credentials.</p>
                    </div>
                    <div className={styles.card}>
                        <EyeOff className={styles.icon} />
                        <h3>Zero Data Sharing</h3>
                        <p>Your business data is private. We never share or sell information to third-party advertisers.</p>
                    </div>
                    <div className={styles.card}>
                        <ClipboardCheck className={styles.icon} />
                        <h3>Compliance</h3>
                        <p>Built with privacy-first principles to ensure your IT operations remain confidential and secure.</p>
                    </div>
                </div>

                <article className={styles.textBody}>
                    <h2>Instructions for Use</h2>
                    <p>
                        The Kivoc System is designed for authorized IT administrative use only.
                        <strong> All users must:</strong>
                    </p>
                    <ul>
                        <li>Maintain confidentiality of their access credentials.</li>
                        <li>Use the system in accordance with enterprise security policies.</li>
                        <li>Report any suspicious activity to the security team.</li>
                    </ul>

                    <h2>Privacy Standard</h2>
                    <p>
                        This system utilizes secure encryption at rest and in transit. By using this platform,
                        you agree to the automated handling of session-based cookies required for functionality.
                    </p>
                </article>
            </main>

            <footer className={styles.footer}>
                &copy; {new Date().getFullYear()} Kivoc Dynamic Technology. All rights reserved.
            </footer>
        </div>
    );
}
