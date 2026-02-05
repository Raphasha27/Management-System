# 🚀 Kivoc Dynamic Technology - IT Management System

### 🌐 [View Live Demo](https://management-system-phi.vercel.app/)

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-5.22.0-2D3748?logo=prisma)
![License](https://img.shields.io/badge/License-MIT-green)


A comprehensive, **AI-powered IT management system** for modern businesses. Built with Next.js 16, featuring real-time project tracking, client management, service catalog, support ticketing, and an intelligent AI assistant.

---

## ✨ Features

### 📊 **Dashboard & Analytics**
- Real-time revenue and project statistics
- Monthly revenue charts with Recharts
- Service distribution visualization
- Active project tracking

### 💼 **Project Management**
- Create and track projects with multiple statuses (Active, Completed, On Hold, Pending)
- Link projects to clients and services
- Budget tracking in South African Rand (ZAR)
- Progress bars and completion tracking

### 👥 **Client Management**
- Complete client directory with contact information
- Track projects and support tickets per client
- Company and individual client support
- Client statistics and engagement metrics

### 🛠️ **Service Catalog**
- Categorized IT service offerings
- Dynamic pricing display
- Service icons based on category
- Custom service creation

### 💬 **Support Ticket System**
- Real-time ticket management
- Agent conversation interface
- Priority and status tracking
- Customer interaction history

### 📚 **Resources & Knowledge Base**
- Document management system
- Categorized resource library
- Search functionality
- File download and external link support

### ⚙️ **Settings & Configuration**
- Organization profile management
- Currency and timezone settings
- Multi-section settings interface

### 🤖 **AI Assistant** (⭐ NEW!)
- **Context-aware responses** about the system
- **Real-time help** with projects, clients, and services
- **System knowledge** including database, features, and navigation
- **Mobile-optimized** chat interface
- **Expandable AI integration** ready for OpenAI API

---

## 🎨 Design Highlights

- ✅ **Fully Mobile Responsive** - Works perfectly on all devices
- ✅ **Modern UI/UX** - Glassmorphism, gradients, and smooth animations
- ✅ **Blue Brand Theme** - Professional Kivoc identity
- ✅ **Touch-Friendly** - Optimized for mobile interactions
- ✅ **Dark Mode Ready** - Prepared for theme switching

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ installed
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/kivoc-management-system.git
   cd kivoc-management-system
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

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📱 Mobile Support

The system is **fully mobile-responsive** with:
- Collapsible sidebar (hamburger menu on mobile)
- Touch-optimized buttons and inputs
- Responsive grid layouts
- Full-screen AI chat on mobile devices
- Optimized navigation for small screens

---

## 🤖 AI Assistant Integration

The built-in AI Assistant provides:

### Current Features:
- **System Knowledge**: Understands all features (projects, clients, services, support)
- **Interactive Help**: Guides users through tasks
- **Mobile Chat UI**: Beautiful floating chat interface
- **Real-time Responses**: Instant feedback on queries

### Extending with OpenAI:
To integrate with OpenAI GPT, update `src/components/AIAssistant.tsx`:

```typescript
const handleSend = async () => {
  // Replace the setTimeout with actual API call:
  const response = await fetch('/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: inputValue }),
  });
  
  const data = await response.json();
  // Use data.response for the AI message
};
```

Create `src/app/api/ai/chat/route.ts`:
```typescript
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  const { message } = await request.json();
  
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful AI assistant for Kivoc Dynamic Technology management system...',
      },
      { role: 'user', content: message },
    ],
  });

  return NextResponse.json({ response: completion.choices[0].message.content });
}
```

Add to `.env`:
```
OPENAI_API_KEY=your_openai_api_key_here
```

---

## 🗄️ Database

### Development
Uses **SQLite** with Prisma ORM for easy local development.

### Production
Easily switch to **PostgreSQL** or **MySQL**:

1. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. Update `.env`:
   ```
   DATABASE_URL="postgresql://user:password@host:5432/database"
   ```

3. Run migrations:
   ```bash
   npx prisma migrate dev
   ```

---

## 📂 Project Structure

```
kivoc-management-system/
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Sample data
├── src/
│   ├── app/
│   │   ├── page.tsx        # Dashboard
│   │   ├── projects/       # Projects page
│   │   ├── clients/        # Clients page
│   │   ├── services/       # Services page
│   │   ├── resources/      # Resources page
│   │   ├── support/        # Support tickets
│   │   └── settings/       # Settings page
│   ├── components/
│   │   ├── Sidebar.tsx     # Navigation
│   │   ├── Header.tsx      # Page headers
│   │   ├── AIAssistant.tsx # AI Chat (⭐ NEW)
│   │   └── Charts.tsx      # Dashboard charts
│   └── lib/
│       └── prisma.ts       # Prisma client
└── public/
    └── kivoc-logo.png      # Brand logo
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy Kivoc Management System"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables
   - Deploy!

3. **Add Environment Variables** in Vercel:
   ```
   DATABASE_URL=your_production_database_url
   OPENAI_API_KEY=your_openai_key (optional, for AI)
   ```

### Deploy to Other Platforms
- **Netlify**: Supports Next.js SSR
- **Railway**: Easy database + app deployment
- **AWS Amplify**: Enterprise-grade hosting

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16.1.6 (App Router) |
| **Frontend** | React 19, TypeScript 5 |
| **Styling** | CSS Modules, Modern CSS |
| **Database** | Prisma ORM 5.22.0 + SQLite/PostgreSQL |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **AI** | Custom + OpenAI ready |

---

## 📊 Features Breakdown

### ✅ Completed Features
- [x] Dashboard with analytics
- [x] Project management
- [x] Client directory
- [x] Service catalog
- [x] Support ticket system
- [x] Resources library
- [x] Settings panel
- [x] Mobile responsive design
- [x] AI Assistant with system knowledge

### 🔄 Future Enhancements
- [ ] OpenAI GPT integration
- [ ] User authentication (NextAuth.js)
- [ ] Email notifications
- [ ] File upload for resources
- [ ] Advanced reporting
- [ ] Export to PDF/Excel
- [ ] Multi-language support
- [ ] Dark mode theme

---

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📧 Contact & Support

**Kivoc Dynamic Technology**
- 🌐 Website: [Coming Soon]
- 📧 Email: admin@kivoc.tech
- 💬 AI Assistant: Built into the app!

---

## 🌟 Show Your Support

Give this project a ⭐️ if you find it helpful!

---

**Built with ❤️ by Kivoc Dynamic Technology Team**
