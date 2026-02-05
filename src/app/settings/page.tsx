import Header from '@/components/Header';
import styles from './settings.module.css';
import { User, Bell, Shield, Database, Palette, Globe, Save, Info } from 'lucide-react';

export default function SettingsPage() {
  const sections = [
    { name: 'General', icon: <User />, active: true },
    { name: 'Notifications', icon: <Bell />, active: false },
    { name: 'Security', icon: <Shield />, active: false },
    { name: 'Data Management', icon: <Database />, active: false },
    { name: 'Appearance', icon: <Palette />, active: false },
    { name: 'Language', icon: <Globe />, active: false },
  ];

  return (
    <div>
      <Header title="Account Settings" />
      
      <div className={styles.container}>
        <div className={styles.layout}>
          {/* Sidebar */}
          <div className={styles.settingsSidebar}>
            {sections.map((section, i) => (
              <button key={i} className={`${styles.navItem} ${section.active ? styles.active : ''}`}>
                {section.icon}
                <span>{section.name}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className={styles.settingsContent}>
            <div className={styles.section}>
              <h2>Organization Profile</h2>
              <p>Update your company details and administrative settings.</p>

              <div className={styles.form}>
                <div className={styles.formGroup}>
                  <label>Company Name</label>
                  <input type="text" defaultValue="Kivoc Dynamic Technology" />
                </div>

                <div className={styles.formGroup}>
                  <label>Primary Email</label>
                  <input type="email" defaultValue="admin@kivoc.tech" />
                </div>

                <div className={styles.grid2}>
                  <div className={styles.formGroup}>
                    <label>Currency</label>
                    <select defaultValue="ZAR">
                      <option value="ZAR">South African Rand (R)</option>
                      <option value="USD">US Dollar ($)</option>
                      <option value="EUR">Euro (€)</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Timezone</label>
                    <select defaultValue="GMT+2">
                      <option value="GMT+2">Johannesburg (GMT+2)</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Description</label>
                  <textarea rows={4} defaultValue="Kivoc Dynamic Technology is a leading IT services provider specializing in web development, cloud solutions, and enterprise software."></textarea>
                </div>

                <div className={styles.alert}>
                  <Info size={18} />
                  <p>Changes to organization profile will be visible to all administrative users.</p>
                </div>

                <div className={styles.actions}>
                  <button className="btn btn-outline">Cancel</button>
                  <button className="btn btn-primary">
                    <Save size={18} />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
