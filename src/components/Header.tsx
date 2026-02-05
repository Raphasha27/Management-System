import { Search, Bell } from 'lucide-react';
import styles from './Header.module.css';

export default function Header({ title }: { title: string }) {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      
      <div className={styles.actions}>
        <div className={styles.search}>
          <Search className={styles.searchIcon} />
          <input type="text" placeholder="Search anything..." className={styles.searchInput} />
        </div>
        
        <div className={styles.notif}>
          <Bell size={20} color="var(--text-primary)" />
        </div>

        <div className={styles.profile}>
          <img src="https://i.pravatar.cc/150?img=32" alt="User" className={styles.avatar} />
          <div className={styles.userInfo}>
            <span className={styles.userName}>Rapha</span>
            <span className={styles.userRole}>Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
}
