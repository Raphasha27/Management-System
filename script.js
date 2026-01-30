// State Management
let state = {
   isAuthenticated: false,
   darkMode: false,
   notifications: 3,
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
   tasks: [],
   budget: { current: 124563, projected: 145000, month: 'February' }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
   checkAuth();
   initCharts();
   initSlider();

   // Check local storage for dark mode
   if (localStorage.getItem('darkMode') === 'true') {
      toggleDarkMode(true);
   }
});

// Authentication
function checkAuth() {
   const loginView = document.getElementById('loginView');
   const appBody = document.getElementById('appBody');
   if (state.isAuthenticated) {
      loginView.classList.add('opacity-0', 'pointer-events-none');
      setTimeout(() => {
         loginView.classList.add('hidden');
         appBody.classList.remove('hidden');
         renderDashboard();
         generateInsight();
      }, 500);
   } else {
      loginView.classList.remove('hidden');
      appBody.classList.add('hidden');
   }
}

function handleLogin(e) {
   e.preventDefault();
   state.isAuthenticated = true;
   showToast('Success: Nexus Core Accessed', 'info');
   checkAuth();
}

function handleLogout() {
   state.isAuthenticated = false;
   showToast('Session terminated', 'warning');
   checkAuth();
}

// Navigation
function navigateTo(page) {
   const titles = {
      'dashboard': 'System Overview',
      'employees': 'Team Directory',
      'projects': 'Project Vault',
      'analytics': 'Market Intelligence',
      'finance': 'Fiscal Analysis',
      'profile': 'Managed Account',
      'settings': 'System Preferences'
   };

   document.getElementById('pageTitle').textContent = titles[page] || titles['dashboard'];

   const views = ['dashboardView', 'employeesView', 'profileView', 'settingsView', 'genericView'];
   views.forEach(v => {
      const el = document.getElementById(v);
      if (el) el.classList.add('hidden');
   });

   const targetView = document.getElementById(`${page}View`) || document.getElementById('genericView');
   if (targetView) targetView.classList.remove('hidden');

   if (page === 'dashboard') {
      renderDashboard();
   } else if (page === 'employees') {
      renderEmployees();
   } else if (page === 'analytics') {
      runBudgetAnalysis();
   }

   // Update active state in sidebar
   document.querySelectorAll('.sidebar-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('onclick').includes(page)) link.classList.add('active');
   });

   // Auto-close sidebar on mobile
   if (window.innerWidth < 768) {
      document.getElementById('sidebar').classList.remove('translate-x-0');
      document.getElementById('sidebar').classList.add('-translate-x-full');
   }
}

function toggleMobileSidebar() {
   const sb = document.getElementById('sidebar');
   if (sb.classList.contains('-translate-x-full')) {
      sb.classList.remove('-translate-x-full');
      sb.classList.add('translate-x-0');
   } else {
      sb.classList.add('-translate-x-full');
      sb.classList.remove('translate-x-0');
   }
}

// Rendering
function renderDashboard() {
   const container = document.getElementById('projectsTable');
   if (!container) return;

   container.innerHTML = state.projects.map(p => `
        <div class="flex items-center justify-between p-4 bg-slate-50 dark:bg-dark-900/50 rounded-xl border border-slate-100 dark:border-white/5">
            <div>
                <div class="font-bold text-slate-800 dark:text-white">${p.name}</div>
                <div class="text-xs text-slate-500">${p.team} members assigned</div>
            </div>
            <div class="text-right">
                <div class="text-xs font-bold uppercase ${p.status === 'active' ? 'text-green-500' : 'text-amber-500'}">${p.status}</div>
                <div class="text-sm font-bold text-slate-800 dark:text-white">${p.progress}%</div>
            </div>
        </div>
    `).join('');
}

function renderEmployees() {
   const list = document.getElementById('employeesList');
   if (!list) return;

   list.innerHTML = state.employees.map(e => `
        <div class="glass p-6 rounded-2xl flex items-center gap-4 transition-all hover:scale-[1.02]">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold">${e.avatar}</div>
            <div class="flex-1">
                <div class="font-bold text-slate-800 dark:text-white">${e.name}</div>
                <div class="text-sm text-slate-500">${e.role}</div>
            </div>
        </div>
    `).join('');
   document.getElementById('employeeCount').textContent = state.employees.length;
}

// AI Engine
function generateInsight() {
   const el = document.getElementById('aiInsightText');
   if (!el) return;
   el.textContent = "AI Core: Analyzing system metrics...";
   el.classList.add('animate-pulse');

   setTimeout(() => {
      el.classList.remove('animate-pulse');
      const insights = [
         `Efficiency Insight: Team output is 14% higher than Q4 benchmarks.`,
         `Budget Forecast: Revenue on track for ${state.budget.projected} target.`,
         `Action Alert: 2 projects require stakeholder review this week.`
      ];
      el.textContent = insights[Math.floor(Math.random() * insights.length)];
   }, 1500);
}

// Chatbot
function toggleChat() {
   const win = document.getElementById('chatWindow');
   win.classList.toggle('hidden');
   win.classList.toggle('flex');
   if (!win.classList.contains('hidden')) document.getElementById('chatInput').focus();
}

function sendMessage() {
   const input = document.getElementById('chatInput');
   const msg = input.value.trim();
   if (!msg) return;

   addMessage(msg, 'user');
   input.value = '';

   const loader = document.getElementById('typingIndicator');
   loader.classList.remove('hidden');

   setTimeout(() => {
      loader.classList.add('hidden');
      let reply = "I've logged that. Anything else I can help with?";
      if (msg.toLowerCase().includes('dark')) {
         toggleDarkMode();
         reply = "Dark mode enabled for optimal focus.";
      } else if (msg.toLowerCase().includes('team')) {
         navigateTo('employees');
         reply = "Here's the current team roster.";
      }
      addMessage(reply, 'bot');
   }, 1000);
}

function addMessage(text, sender) {
   const box = document.getElementById('chatMessages');
   const div = document.createElement('div');
   div.className = `message ${sender}`;
   div.textContent = text;
   box.appendChild(div);
   box.scrollTop = box.scrollHeight;
}

// Utilities
function toggleDarkMode(isInitial = false) {
   const isDark = document.documentElement.classList.toggle('dark');
   if (!isInitial) showToast(isDark ? 'Dark Mode Active' : 'Light Mode Active', 'info');
   localStorage.setItem('darkMode', isDark);
}

function showToast(msg, type) {
   const container = document.getElementById('toastContainer');
   const toast = document.createElement('div');
   toast.className = `p-4 rounded-xl shadow-2xl flex items-center gap-3 animate-fadeIn glass text-sm font-bold border-l-4 ${type === 'success' ? 'border-green-500 text-green-700' : type === 'warning' ? 'border-red-500 text-red-700' : 'border-primary-500 text-slate-800 dark:text-white'}`;
   toast.innerHTML = `<i class="fas fa-info-circle"></i> ${msg}`;
   container.appendChild(toast);
   setTimeout(() => toast.remove(), 4000);
}

function initCharts() {
   const ctx = document.getElementById('revenueChart');
   if (!ctx) return;
   new Chart(ctx, {
      type: 'line',
      data: {
         labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
         datasets: [{
            label: 'Revenue Trend',
            data: [12, 19, 13, 15, 22, 30],
            borderColor: '#6366f1',
            tension: 0.4
         }]
      },
      options: {
         responsive: true,
         maintainAspectRatio: false,
         plugins: { legend: { display: false } },
         scales: { y: { display: false }, x: { grid: { display: false } } }
      }
   });
}

function initSlider() {
   const partners = ['Google', 'Microsoft', 'Apple', 'Meta', 'Amazon', 'OpenAI', 'SpaceX'];
   const el = document.getElementById('partnerSlider');
   if (!el) return;
   el.innerHTML = [...partners, ...partners].map(p => `
        <div class="px-8 text-slate-400 font-bold tracking-widest uppercase text-xs opacity-50 hover:opacity-100 transition cursor-pointer">${p}</div>
    `).join('');
}

function runBudgetAnalysis() {
   const desc = document.getElementById('genericDesc');
   desc.innerHTML = `<div class="p-6 bg-green-500/10 rounded-2xl border border-green-500/20 text-green-600 font-bold">Projected Profit: $${(state.budget.projected - state.budget.current).toLocaleString()} increase detected.</div>`;
}

// Profile Management
function updateProfile(e) {
   if (e) e.preventDefault();
   const newName = document.getElementById('editName').value;
   const newEmail = document.getElementById('editEmail').value;

   if (newName && newEmail) {
      // Update labels
      document.getElementById('profileDisplayName').textContent = newName;
      document.getElementById('sidebarName').textContent = newName;

      // Update initials
      const initial = newName.charAt(0).toUpperCase();
      document.getElementById('profileAvatar').textContent = initial;
      document.getElementById('sidebarInitial').textContent = initial;

      showToast('Profile Updated Successfully', 'success');
      navigateTo('dashboard');
   }
}

function openModal(id) { document.getElementById(id).classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }
function createProject(e) {
   e.preventDefault();
   const name = document.getElementById('projectName').value;
   state.projects.unshift({ id: Date.now(), name, status: 'active', progress: 0, team: 1 });
   renderDashboard();
   closeModal('newProjectModal');
   showToast(`Project "${name}" initialized`, 'success');
}