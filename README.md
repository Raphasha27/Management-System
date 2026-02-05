# 🛍️ ShopMaster - Premium Management System

A modern, full-stack e-commerce management dashboard built with **Next.js 16**, **TypeScript**, **Prisma**, and **SQLite**. ShopMaster provides a beautiful, responsive interface for managing products, orders, customers, and analytics.

![ShopMaster Dashboard](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-7.3-2D3748?style=for-the-badge&logo=prisma)

![Dashboard Preview](./public/dashboard-preview.png)

## ✨ Features

- 📊 **Real-time Dashboard** - Track revenue, orders, and customer metrics at a glance
- 🛒 **Order Management** - View and manage customer orders with status tracking
- 📦 **Product Catalog** - Manage your product inventory with ease
- 👥 **Customer Analytics** - Track customer activity and insights
- 📈 **Interactive Charts** - Beautiful visualizations using Recharts
- 🎨 **Premium UI/UX** - Modern design with smooth animations and transitions
- 🔒 **Type-Safe** - Full TypeScript support for robust development
- 💾 **Database** - Prisma ORM with SQLite for easy setup and portability

## 🚀 Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: CSS Modules with custom design system
- **Backend**: Next.js API Routes, Server Components
- **Database**: Prisma ORM + SQLite
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React

## 📦 Installation

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Raphasha27/Management-System.git
   cd Management-System/shop-master
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   # Generate Prisma Client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev --name init
   ```

4. **Seed the database (optional)**
   ```bash
   node prisma/seed.js
   ```
   
   *Note: The application will auto-seed sample data on first run if the database is empty.*

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗂️ Project Structure

```
shop-master/
├── prisma/
│   ├── schema.prisma      # Database schema
│   ├── migrations/        # Database migrations
│   └── seed.js           # Sample data seeder
├── src/
│   ├── app/
│   │   ├── page.tsx      # Dashboard page
│   │   ├── layout.tsx    # Root layout
│   │   └── globals.css   # Global styles
│   ├── components/
│   │   ├── Sidebar.tsx   # Navigation sidebar
│   │   ├── Header.tsx    # Top header bar
│   │   └── Charts.tsx    # Chart components
│   └── lib/
│       └── prisma.ts     # Prisma client singleton
├── public/               # Static assets
└── package.json
```

## 🎨 Design System

ShopMaster uses a carefully crafted design system with:

- **Primary Color**: `#6C5DD3` (Premium Purple)
- **Secondary Color**: `#FFCE73` (Golden Yellow)
- **Success Color**: `#4FD2B5` (Teal Green)
- **Typography**: Inter font family
- **Border Radius**: 20px for cards, 12px for buttons
- **Shadows**: Subtle elevation system for depth

## 📊 Database Schema

The application uses a normalized database schema with the following models:

- **User** - Customer and admin accounts
- **Product** - Product catalog with pricing and inventory
- **Order** - Customer orders with status tracking
- **OrderItem** - Line items linking orders and products

## 🛠️ Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Prisma Studio (Database GUI)
npx prisma studio

# Database migrations
npx prisma migrate dev

# Reset database
npx prisma migrate reset
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will auto-detect Next.js and configure the build
4. For production, upgrade to PostgreSQL (see Prisma docs)

### Other Platforms

ShopMaster can be deployed on any platform that supports Next.js:
- Railway
- Render
- Netlify
- AWS/Google Cloud/Azure

**Note**: For production deployments, consider migrating from SQLite to PostgreSQL or MySQL for better scalability.

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
```

For production with PostgreSQL:
```env
DATABASE_URL="postgresql://user:password@host:5432/database"
```

## 📸 Screenshots

### Dashboard Overview
Beautiful stats cards showing revenue, orders, and customer metrics with trend indicators.

### Sales Analytics
Interactive bar charts displaying monthly sales performance.

### Order Management
Comprehensive table view of recent orders with status tracking.

### Product Catalog
Visual grid of top-selling products with images and pricing.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Raphasha27**
- GitHub: [@Raphasha27](https://github.com/Raphasha27)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Prisma for the excellent ORM
- Recharts for beautiful charts
- Lucide for the icon set

---

**Made with ❤️ by Raphasha27**
