/**
 * NexusSys Management System - Core Engine v3.4
 * Enhanced Stability & Global Scope Integration
 */

// Global State
window.state = {
   isAuthenticated: false,
   darkMode: localStorage.getItem('darkMode') === 'true',
   user: {
      name: 'Raphasha Admin',
      email: 'admin@nexussys.com',
      role: 'Super Admin',
      initials: 'RA'
   },
   projects: [
      { id: 1, name: 'Nexus Mobile App', status: 'active', progress: 75, team: 4 },
      { id: 2, name: 'Cloud Migration', status: 'review', progress: 90, team: 3 },
      { id: 3, name: 'AI Optimization', status: 'planning', progress: 15, team: 2 }
   ],
   employees: [
      { id: 1, name: 'Alice Johnson', role: 'UI Designer', status: 'active', avatar: 'AJ' },
      { id: 2, name: 'Bob Smith', role: 'Backend Developer', status: 'active', avatar: 'BS' },
      { id: 3, name: 'Charlie Davis', role: 'Project Manager', status: 'leave', avatar: 'CD' }
   ],
   budget: { current: 124563, projected: 145000, month: 'February' }
};

// Initialize System
document.addEventListener('DOMContentLoaded', () => {
   console.log('NexusSys: System Booting...');

   // Manual Event Binding for absolute reliability
   const loginForm = document.querySelector('form');
   if (loginForm) {
      loginForm.addEventListener('submit', window.handleLogin);
   }

   const loginBtn = document.getElementById('loginBtn');
   if (loginBtn) {
      loginBtn.addEventListener('click', (e) => {
         console.log('Login Button Clicked');
      });
   }

   // Sync Dark Mode
   if (window.state.darkMode) {
      document.documentElement.classList.add('dark');
   }

   // Initial Auth Check
   window.checkAuth();

   // Setup UI Components
   window.initCharts();
   window.initSlider();
   window.syncProfileUI();
});

// --- Core Functions (Attached to window for global scope) ---

window.checkAuth = function () {
   const loginView = document.getElementById('loginView');
   const appBody = document.getElementById('appBody');

   if (!loginView || !appBody) return;

   if (window.state.isAuthenticated) {
      loginView.classList.add('opacity-0', 'pointer-events-none');
      setTimeout(() => {
         loginView.classList.add('hidden');
         appBody.classList.remove('hidden');
         window.navigateTo('dashboard');
         window.generateInsight();
      }, 500);
   } else {
      loginView.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
      appBody.classList.add('hidden');
   }
};

window.handleLogin = function (e) {
   if (e) e.preventDefault();
   console.log('NexusSys: Attempting Login...');
   window.state.isAuthenticated = true;
   window.showToast('Authentication Successful', 'success');
   window.checkAuth();
};

window.handleLogout = function () {
   console.log('NexusSys: Logging out...');
   window.state.isAuthenticated = false;
   window.showToast('Session terminated', 'warning');
   window.checkAuth();
};

window.navigateTo = function (page) {
   console.log('NexusSys: Navigating to', page);

   const titles = {
      'dashboard': 'System Overview',
      'employees': 'Team Directory',
      'projects': 'Project Vault',
      'analytics': 'Market Intelligence',
      'finance': 'Fiscal Analysis',
      'profile': 'Managed Account',
      'settings': 'System Preferences'
   };

   // Update Header
   const pageTitle = document.getElementById('pageTitle');
   if (pageTitle) pageTitle.textContent = titles[page] || 'Module';

   // Switch Views
   const views = ['dashboardView', 'employeesView', 'profileView', 'settingsView', 'genericView'];
   views.forEach(v => {
      const el = document.getElementById(v);
      if (el) el.classList.add('hidden');
   });

   const targetView = document.getElementById(`${page}View`) || document.getElementById('genericView');
   if (targetView) {
      targetView.classList.remove('hidden');
      if (targetView.id === 'genericView') {
         document.getElementById('genericTitle').textContent = titles[page];
         document.getElementById('genericDesc').textContent = `Accessing the ${titles[page]} module...`;
      }
   }

   // Module Specific Actions
   if (page === 'dashboard') window.renderDashboard();
   if (page === 'employees') window.renderEmployees();
   if (page === 'analytics') window.runBudgetAnalysis();

   // Update Navigation Styles
   document.querySelectorAll('.sidebar-link, [onclick*="navigateTo"]').forEach(el => {
      el.classList.remove('active', 'bg-white/10', 'text-white');
      const clickAttr = el.getAttribute('onclick') || '';
      if (clickAttr.includes(`'${page}'`)) {
         el.classList.add('active', 'bg-white/10', 'text-white');
      }
   });

   // Mobile Sidebar Auto-Close
   const sidebar = document.getElementById('sidebar');
   if (window.innerWidth < 768 && sidebar) {
      sidebar.classList.remove('translate-x-0');
      sidebar.classList.add('-translate-x-full');
   }
};

window.toggleMobileSidebar = function () {
   const sb = document.getElementById('sidebar');
   if (!sb) return;
   sb.classList.toggle('-translate-x-full');
   sb.classList.toggle('translate-x-0');
};

window.renderDashboard = function () {
   const table = document.getElementById('projectsTable');
   if (!table) return;
   table.innerHTML = window.state.projects.map(p => `
        <div class="flex items-center justify-between p-4 bg-slate-50 dark:bg-dark-900/50 rounded-xl border border-slate-100 dark:border-white/10 transition hover:border-primary-500/50">
            <div>
                <div class="font-bold text-slate-800 dark:text-white">${p.name}</div>
                <div class="text-xs text-slate-500">${p.team} members</div>
            </div>
            <div class="text-right">
                <div class="text-xs font-bold uppercase ${p.status === 'active' ? 'text-green-500' : 'text-amber-500'}">${p.status}</div>
                <div class="text-sm font-bold text-slate-800 dark:text-white">${p.progress}%</div>
            </div>
        </div>
    `).join('');
};

window.renderEmployees = function () {
   const list = document.getElementById('employeesList');
   if (!list) return;
   list.innerHTML = window.state.employees.map(e => `
        <div class="glass p-6 rounded-2xl flex items-center gap-4 transition hover:scale-[1.02] cursor-pointer">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">${e.avatar}</div>
            <div class="flex-1">
                <div class="font-bold text-slate-800 dark:text-white">${e.name}</div>
                <div class="text-xs text-slate-500 uppercase font-semibold">${e.role}</div>
            </div>
            <div class="w-2 h-2 rounded-full ${e.status === 'active' ? 'bg-green-500' : 'bg-amber-500'}"></div>
        </div>
    `).join('');
   const countEl = document.getElementById('employeeCount');
   if (countEl) countEl.textContent = window.state.employees.length;
};

window.updateProfile = function (e) {
   if (e) e.preventDefault();
   const newName = document.getElementById('editName').value;
   const newEmail = document.getElementById('editEmail').value;

   if (newName) {
      window.state.user.name = newName;
      window.state.user.email = newEmail;
      window.state.user.initials = newName.charAt(0).toUpperCase() + (newName.split(' ')[1] ? newName.split(' ')[1].charAt(0).toUpperCase() : '');

      window.syncProfileUI();
      window.showToast('Profile Synchronized', 'success');
      window.navigateTo('dashboard');
   }
};

window.syncProfileUI = function () {
   const { name, initials, role } = window.state.user;

   const elements = {
      'profileDisplayName': name,
      'sidebarName': name,
      'profileAvatar': initials,
      'sidebarInitial': initials,
      'editName': name,
      'editEmail': window.state.user.email
   };

   for (const [id, value] of Object.entries(elements)) {
      const el = document.getElementById(id);
      if (el) {
         if (el.tagName === 'INPUT') el.value = value;
         else el.textContent = value;
      }
   }
};

window.toggleDarkMode = function (noToast = false) {
   const isDark = document.documentElement.classList.toggle('dark');
   window.state.darkMode = isDark;
   localStorage.setItem('darkMode', isDark);
   if (!noToast) window.showToast(isDark ? 'Dark Mode Enabled' : 'Light Mode Enabled', 'info');
};

window.showToast = function (msg, type) {
   const container = document.getElementById('toastContainer');
   if (!container) return;

   const toast = document.createElement('div');
   toast.className = `p-4 rounded-xl shadow-2xl flex items-center gap-3 animate-fadeIn glass text-sm font-bold border-l-4 pointer-events-auto transition hover:scale-105 ${type === 'success' ? 'border-green-500 text-green-700' :
      type === 'warning' ? 'border-red-500 text-red-700' :
         'border-primary-500 text-slate-800 dark:text-white'
      }`;
   toast.innerHTML = `<i class="fas fa-info-circle"></i> ${msg}`;
   container.appendChild(toast);
   setTimeout(() => {
      toast.classList.add('opacity-0');
      setTimeout(() => toast.remove(), 500);
   }, 4000);
};

window.initCharts = function () {
   const ctx = document.getElementById('revenueChart');
   if (!ctx || typeof Chart === 'undefined') return;

   new Chart(ctx, {
      type: 'line',
      data: {
         labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
         datasets: [{
            label: 'Revenue',
            data: [12000, 19000, 13000, 15000, 22000, 30000],
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            fill: true,
            tension: 0.4
         }]
      },
      options: {
         responsive: true,
         maintainAspectRatio: false,
         plugins: { legend: { display: false } },
         scales: {
            y: { display: false },
            x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
         }
      }
   });
};

window.initSlider = function () {
   const slider = document.getElementById('partnerSlider');
   if (!slider) return;
   const partners = ['Google', 'Microsoft', 'Apple', 'Meta', 'Amazon', 'OpenAI', 'SpaceX'];
   slider.innerHTML = [...partners, ...partners].map(p => `
        <div class="px-8 text-slate-400 font-bold tracking-widest uppercase text-xs opacity-50 hover:opacity-100 transition cursor-pointer">${p}</div>
    `).join('');
};

window.generateInsight = function () {
   const el = document.getElementById('aiInsightText');
   if (!el) return;
   el.textContent = "AI Core: Recalculating metrics...";
   el.classList.add('animate-pulse');
   setTimeout(() => {
      el.classList.remove('animate-pulse');
      const insights = [
         "Efficiency Insight: High team velocity detected for Nexus App.",
         "Fiscal Forecast: Revenue trending 12% above monthly KPI.",
         "Strategy: Recommended resource shift to Cloud Migration."
      ];
      el.textContent = insights[Math.floor(Math.random() * insights.length)];
   }, 1500);
};

window.runBudgetAnalysis = function () {
   const desc = document.getElementById('genericDesc');
   if (desc) {
      desc.innerHTML = `<div class="p-6 bg-green-500/10 rounded-2xl border border-green-500/20 text-green-600 font-bold animate-fadeIn">
            Predictive Analysis Complete: Forecast shows a $${(window.state.budget.projected - window.state.budget.current).toLocaleString()} growth trajectory for ${window.state.budget.month}.
        </div>`;
   }
};

window.openModal = function (id) {
   const el = document.getElementById(id);
   if (el) el.classList.remove('hidden');
};

window.closeModal = function (id) {
   const el = document.getElementById(id);
   if (el) el.classList.add('hidden');
};

window.createProject = function (e) {
   if (e) e.preventDefault();
   const name = document.getElementById('projectName').value;
   if (name) {
      window.state.projects.unshift({ id: Date.now(), name, status: 'active', progress: 0, team: 1 });
      window.renderDashboard();
      window.closeModal('newProjectModal');
      window.showToast(`Project "${name}" Initialized`, 'success');
   }
};

// Chatbot Logic
window.toggleChat = function () {
   const win = document.getElementById('chatWindow');
   if (win) {
      win.classList.toggle('hidden');
      win.classList.toggle('flex');
      if (!win.classList.contains('hidden')) document.getElementById('chatInput').focus();
   }
};

window.sendMessage = function () {
   const input = document.getElementById('chatInput');
   const msg = input.value.trim();
   if (!msg) return;

   window.addChatMessage(msg, 'user');
   input.value = '';

   document.getElementById('typingIndicator').classList.remove('hidden');
   setTimeout(() => {
      document.getElementById('typingIndicator').classList.add('hidden');
      let reply = "Processing request via Nexus Core...";
      if (msg.toLowerCase().includes('dark')) {
         window.toggleDarkMode();
         reply = "Illumination settings adjusted.";
      } else if (msg.toLowerCase().includes('team')) {
         window.navigateTo('employees');
         reply = "Directing you to Team Directory.";
      }
      window.addChatMessage(reply, 'bot');
   }, 1000);
};

window.addChatMessage = function (text, sender) {
   const box = document.getElementById('chatMessages');
   if (!box) return;
   const div = document.createElement('div');
   div.className = `message ${sender} animate-fadeIn`;
   div.textContent = text;
   box.appendChild(div);
   box.scrollTop = box.scrollHeight;
};