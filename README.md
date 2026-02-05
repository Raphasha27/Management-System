# 🚀 Kivoc Dynamic Technology - IT Management System

### 🌐 [View Live Demo](https://management-system-six-blush.vercel.app/)

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-5.22.0-2D3748?logo=prisma)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🔐 Mock Access (Live Demo)
For testing purposes, please use the following credentials on the login page:

- **Email:** `admin@kivoc.co.za`
- **Password:** `password123`

---

## ✨ Features

### 🚀 **Get Started Experience**
- Professional landing page with corporate identity.
- Key feature highlights and "Get Started" call-to-action.
- Easy navigation to the secure login gateway.

### 📊 **Dashboard & Analytics**
- Real-time revenue and project statistics.
- Monthly revenue charts with Recharts.
- Service distribution visualization.
- Active project tracking.

### 💼 **Project Management**
- Create and track projects with multiple statuses.
- Budget tracking in South African Rand (ZAR).
- Progress bars and completion tracking.

### 🤖 **AI Assistant** (🎙️ VOICE ENABLED)
- **Siri-like Responses**: High-quality voice output for a futuristic feel.
- **Voice Input**: Dedicated recording button for hands-free management.
- **Context-aware**: Understands your business stats and navigates the system.

---

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Raphasha27/Management-System.git
   cd Kivoc_System
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

---

## 📂 Project Structure

```
Kivoc_System/
├── src/
│   ├── app/
│   │   ├── page.tsx            # Get Started Landing Page
│   │   ├── login/              # Secure Login Page
│   │   ├── dashboard/          # Analytics Dashboard
│   │   ├── projects/           # Projects management
│   │   ├── clients/            # Client directory
│   │   ├── services/           # IT Service catalog
│   │   └── support/            # Support tickets (Call Center)
│   ├── components/
│   │   ├── Sidebar.tsx         # Updated navigation hierarchy
│   │   └── AIAssistant.tsx     # Voice-enabled AI companion
│   └── lib/
│       └── mockData.ts         # Showcase fallback safety
```

---

## 🎨 Design System
- **Primary Color:** Royale Blue (#2563EB)
- **Secondary Color:** Sky Blue (#3B82F6)
- **Typography:** Inter (Modern sans-serif)

---

## 📄 License
MIT License - See [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by Kivoc Dynamic Technology Team**
