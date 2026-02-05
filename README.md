# 🚀 Kivoc Dynamic Technology - IT Management System

### 🌐 [View Live Demo](https://management-system-six-blush.vercel.app/)

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-5.22.0-2D3748?logo=prisma)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📝 Project Overview
**Kivoc Dynamic Technology** is a premium, all-in-one management platform designed for IT service providers and call centers. This system streamlines business operations by integrating project tracking, client management, and real-time support ticketing into a unified, AI-powered interface.

---

## 🔐 Mock Access (Live Demo)
To explore the system as an administrator, please use the following credentials on the login page:

- **Email:** `admin@kivoc.co.za`
- **Password:** `password123`

---

## ✨ Features & Instructions

### 1. **Get Started & Authentication**
- **Landing Page**: Start at the professional landing page featuring our corporate identity.
- **Secure Login**: Access the dashboard through the secure gateway using the mock credentials provided above.

### 2. **AI Business Companion (🎙️ VOICE ENABLED)**
- **Hands-Free**: Click the **Microphone** button to speak your commands.
- **Siri-Style Energy**: Hear real-time voice feedback on business stats and system help.
- **Instant Insights**: Use "Mock Suggestions" to quickly ask about revenue, project counts, or client numbers without typing.

### 3. **IT Dashboard & Analytics**
- **Live Stats**: Automated monitoring of revenue (in ZAR), active projects, and client growth.
- **Visual Reports**: Interactive charts showing monthly trends and service distribution.
- **Mobile Optimized**: Full-width tables with horizontal scrolling for clear data viewing on any device.

### 4. **Project & Client Management**
- **Lifecycle Tracking**: Monitor projects from "Pending" to "Completed" with live progress bars.
- **Client Directory**: Manage contact details and link tickets/projects to specific business accounts.

### 5. **Call Center Agent Interface**
- **Real-time Support**: Handle incoming support tickets through a dedicated chat-like interface.
- **Priority Management**: Color-coded tickets (Critical, High, Medium, Low) for efficient prioritization.
- **Seamless Flow**: Toggle between ticket lists and active conversations on mobile.

---

## 🛠️ Step-by-Step Installation

### **Local Setup**
1. **Clone the repository**
   ```bash
   git clone https://github.com/Raphasha27/Management-System.git
   cd Kivoc_System
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Database Configuration**
   - The system uses Prisma with SQLite for zero-config local setup.
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

4. **Launch Dev Server**
   ```bash
   npm run dev
   ```
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📂 Project Navigation Hierarchy

```
Kivoc_System/
├── src/
│   ├── app/
│   │   ├── page.tsx            # Get Started Page
│   │   ├── login/              # Secure Gateway
│   │   ├── dashboard/          # Analytics & Overview
│   │   ├── projects/           # Operations Tracking
│   │   ├── clients/            # Client Relations
│   │   ├── services/           # Service Catalog (ZAR Pricing)
│   │   └── support/            # Call Center (Tickets)
├── components/
│   ├── Sidebar.tsx             # Responsive Navigation
│   └── AIAssistant.tsx         # Voice AI Core
```

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by Kivoc Dynamic Technology Team**
