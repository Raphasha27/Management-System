export const MOCK_CLIENTS = [
  { id: 1, name: 'John Smith', email: 'john@techcorp.com', company: 'TechCorp Solutions', phone: '+27 11 555 0101', _count: { projects: 2, tickets: 1 } },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@innovate.com', company: 'Innovate Digital', phone: '+27 12 555 0102', _count: { projects: 1, tickets: 0 } },
  { id: 3, name: 'Michael Chen', email: 'm.chen@globalsafe.io', company: 'Global Safe Security', phone: '+27 21 555 0103', _count: { projects: 3, tickets: 2 } },
];

export const MOCK_SERVICES = [
  { id: 1, name: 'Web Development', category: 'Web Development', description: 'Custom responsive websites and complex web applications built with Next.js.', price: 45000.0 },
  { id: 2, name: 'Mobile App Development', category: 'Software Development', description: 'Native-feel iOS and Android applications for your business.', price: 95000.0 },
  { id: 3, name: 'Cloud Migration', category: 'Cloud Services', description: 'Seamless migration of your infrastructure to AWS or Azure.', price: 35000.0 },
  { id: 4, name: 'Cybersecurity Audit', category: 'Security Services', description: 'Comprehensive security testing and vulnerability assessment.', price: 28000.0 },
];

export const MOCK_PROJECTS = [
  { 
    id: 1, 
    name: 'E-Commerce Platform', 
    status: 'Active', 
    budget: 45000, 
    startDate: new Date(), 
    client: MOCK_CLIENTS[0], 
    services: [{ id: 1, service: MOCK_SERVICES[0] }] 
  },
  { 
    id: 2, 
    name: 'Corporate Intranet', 
    status: 'Completed', 
    budget: 32000, 
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 
    client: MOCK_CLIENTS[1], 
    services: [{ id: 2, service: MOCK_SERVICES[2] }] 
  },
];

export const MOCK_STATS = {
  projectCount: 12,
  clientCount: 8,
  serviceCount: 6,
  ticketCount: 4,
  totalRevenue: 285000,
  status: 'Online (Demo Mode)',
  lastUpdate: new Date().toISOString()
};
