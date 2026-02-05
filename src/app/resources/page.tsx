import Header from '@/components/Header';
import styles from './resources.module.css';
import { FileCode, Book, Download, ExternalLink, Shield, Server, Box, Search } from 'lucide-react';

export default function ResourcesPage() {
  const resources = [
    {
      title: 'Technical Documentation',
      icon: <FileCode />,
      count: '42 Files',
      color: '#2563eb',
    },
    {
      title: 'Company Policies',
      icon: <Shield />,
      count: '12 Files',
      color: '#10b981',
    },
    {
      title: 'Service Level Agreements',
      icon: <Server />,
      count: '18 Files',
      color: '#f59e0b',
    },
    {
      title: 'Brand Assets',
      icon: <Box />,
      count: '24 Files',
      color: '#8b5cf6',
    },
  ];

  const recentFiles = [
    { name: 'Kivoc_Network_Architecture_v2.pdf', type: 'PDF', size: '4.2 MB', date: '2 hours ago' },
    { name: 'Client_Onboarding_Checklist.docx', type: 'DOCX', size: '1.1 MB', date: 'Yesterday' },
    { name: 'Cloud_Migration_Strategy_2026.pptx', type: 'PPTX', size: '12.5 MB', date: '3 days ago' },
    { name: 'Security_Audit_Report_Jan.pdf', type: 'PDF', size: '2.8 MB', date: '1 week ago' },
  ];

  return (
    <div>
      <Header title="Resources & Knowledge Base" />
      
      <div className={styles.container}>
        <div className={styles.searchBar}>
          <Search size={20} className={styles.searchIcon} />
          <input type="text" placeholder="Search resources, documents, or knowledge base articles..." />
        </div>

        <div className={styles.categories}>
          {resources.map((res, i) => (
            <div key={i} className={styles.categoryCard}>
              <div className={styles.catIcon} style={{ background: `${res.color}15`, color: res.color }}>
                {res.icon}
              </div>
              <div className={styles.catInfo}>
                <h3>{res.title}</h3>
                <span>{res.count}</span>
              </div>
              <button className={styles.catAction}>
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className={styles.filesSection}>
          <div className={styles.sectionHeader}>
            <h2>Recent Documents</h2>
            <button className="btn btn-outline">View All Files</button>
          </div>

          <div className={styles.fileList}>
            {recentFiles.map((file, i) => (
              <div key={i} className={styles.fileItem}>
                <div className={styles.fileTypeIcon}>
                  {file.type === 'PDF' ? <Book size={20} /> : <Download size={20} />}
                </div>
                <div className={styles.fileName}>
                  <h3>{file.name}</h3>
                  <span>{file.type} • {file.size}</span>
                </div>
                <div className={styles.fileDate}>{file.date}</div>
                <div className={styles.fileActions}>
                  <button className={styles.iconBtn}><Download size={18} /></button>
                  <button className={styles.iconBtn}><ExternalLink size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Fixed import for missing ArrowRight
import { ArrowRight } from 'lucide-react';
