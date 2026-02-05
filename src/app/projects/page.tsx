import Header from '@/components/Header';
export const dynamic = 'force-dynamic';
import styles from './projects.module.css';
import prisma from '@/lib/prisma';
import { Code, Clock, CheckCircle, AlertCircle, Calendar, Plus, User } from 'lucide-react';
import { MOCK_PROJECTS } from '@/lib/mockData';

async function getProjects() {
  try {
    return await (prisma as any).project.findMany({
      orderBy: { startDate: 'desc' },
      include: { client: true, services: { include: { service: true } } }
    });
  } catch (e) {
    return MOCK_PROJECTS;
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <Clock size={16} className={styles.activeIcon} />;
      case 'Completed': return <CheckCircle size={16} className={styles.completedIcon} />;
      case 'On Hold': return <AlertCircle size={16} className={styles.holdIcon} />;
      default: return <Clock size={16} className={styles.pendingIcon} />;
    }
  };

  return (
    <div>
      <Header title="Projects Management" />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.info}><h2>Active Projects</h2><p>Track progress and milestones of ongoing IT projects.</p></div>
          <button className="btn btn-primary"><Plus size={18} /><span>New Project</span></button>
        </div>
        <div className={styles.projectList}>
          {projects.map((project: any) => (
            <div key={project.id} className={styles.projectCard}>
              <div className={styles.projectMain}>
                <div className={styles.projectTitle}>
                  <div className={styles.iconBox} style={{ background: '#2563eb15', color: '#2563eb' }}><Code size={20} /></div>
                  <div><h3>{project.name}</h3><div className={styles.clientInfo}><User size={14} /><span>{project.client?.name} | {project.client?.company || 'Private'}</span></div></div>
                </div>
                <div className={styles.statusBadge}>{getStatusIcon(project.status)}<span className={`${styles.statusText} ${styles[project.status.toLowerCase().replace(' ', '')]}`}>{project.status}</span></div>
              </div>
              <div className={styles.projectMeta}>
                <div className={styles.metaItem}><Calendar size={14} /><div><label>Start Date</label><span>{new Date(project.startDate).toLocaleDateString()}</span></div></div>
                <div className={styles.metaItem}><Code size={14} /><div><label>Services</label><div className={styles.tags}>{project.services?.map((ps: any) => (<span key={ps.id} className={styles.tag}>{ps.service.name}</span>))}</div></div></div>
              </div>
              <div className={styles.projectFooter}>
                <div className={styles.budget}><label>Budget</label><span>R {project.budget.toLocaleString()}</span></div>
                <div className={styles.progress}>
                  <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: project.status === 'Completed' ? '100%' : project.status === 'Active' ? '65%' : '0%' }}></div></div>
                  <div className={styles.progressText}>{project.status === 'Completed' ? '100%' : project.status === 'Active' ? '65%' : project.status}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
