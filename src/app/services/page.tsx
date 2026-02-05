import Header from '@/components/Header';
import styles from './services.module.css';
import prisma from '@/lib/prisma';
import { Server, Code, Shield, Globe, Cpu, Edit3, Plus, ArrowRight } from 'lucide-react';

async function getServices() {
  return await prisma.service.findMany({
    orderBy: { category: 'asc' }
  });
}

export default async function ServicesPage() {
  const services = await getServices();

  const getIcon = (category: string) => {
    if (category.includes('Web')) return <Globe size={24} />;
    if (category.includes('Software') || category.includes('App')) return <Code size={24} />;
    if (category.includes('Cloud')) return <Server size={24} />;
    if (category.includes('Security')) return <Shield size={24} />;
    if (category.includes('Design')) return <Edit3 size={24} />;
    return <Cpu size={24} />;
  };

  return (
    <div>
      <Header title="Service Catalog" />
      
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.intro}>
            <h2>IT Service Offerings</h2>
            <p>Standardized service packages and custom IT solutions for Kivoc clients.</p>
          </div>
          <button className="btn btn-primary">
            <Plus size={18} />
            <span>Add Service</span>
          </button>
        </div>

        <div className={styles.grid}>
          {services.map((service) => (
            <div key={service.id} className={styles.serviceCard}>
              <div className={styles.iconWrapper} style={{ background: '#2563eb15', color: '#2563eb' }}>
                {getIcon(service.category)}
              </div>
              
              <div className={styles.content}>
                <div className={styles.category}>{service.category}</div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </div>

              <div className={styles.footer}>
                <div className={styles.priceInfo}>
                  <label>Starting from</label>
                  <div className={styles.price}>R {service.price.toLocaleString()}</div>
                </div>
                <button className={styles.actionBtn}>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}

          {/* New Service Placeholder */}
          <div className={styles.addPlaceholder}>
            <div className={styles.addIcon}>
              <Plus size={32} />
            </div>
            <h3>Custom Solution</h3>
            <p>Can't find what you're looking for? Define a new custom service package.</p>
            <button className="btn btn-outline" style={{ marginTop: 'auto' }}>Create Service</button>
          </div>
        </div>
      </div>
    </div>
  );
}
