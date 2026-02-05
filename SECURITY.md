# Security Policy

## Kivoc Dynamic Technology Security Standards

At Kivoc Dynamic Technology, security is our top priority. The Kivoc System is built with a "Security by Design" approach to ensure your data and operations are protected at all times.

## 🛡️ Implemented Security Measures

### 1. **Authentication & Session Management**
- **Secure API Auth**: Login is handled via a dedicated backend API (`/api/auth/login`).
- **HttpOnly Cookies**: Session tokens are stored in `httpOnly` cookies, preventing XSS-based token theft.
- **SameSite Protection**: Cookies use `SameSite: Lax` to prevent CSRF attacks.
- **Secure Flag**: In production, cookies are only transmitted over HTTPS.

### 2. **Middleware Protection**
- **Route Guarding**: Next.js Middleware (`middleware.ts`) enforces authentication for all dashboard routes (`/dashboard`, `/projects`, etc.).
- **Unauthorized Access**: Any attempt to access protected API endpoints without a valid session returns a `401 Unauthorized` status.
- **Automatic Redirects**: Unauthenticated users are automatically redirected to the secure login gateway.

### 3. **HTTP Security Headers**
The following headers are strictly enforced to harden the browser environment:
- **X-Frame-Options: DENY**: Prevents Clickjacking attacks.
- **X-Content-Type-Options: nosniff**: Prevents MIME type sniffing.
- **Referrer-Policy: strict-origin-when-cross-origin**: Protects privacy while navigating.
- **Permissions-Policy**: Restricts browser features (e.g., camera, geolocation) to minimize attack surface.

### 4. **Infrastructure Security**
- **Environment Isolation**: Database credentials and sensitive keys are managed via `.env` files and never committed to version control.
- **Database Safety**: Prisma ORM provides protection against SQL Injection through prepared statements.

## 🔒 Instructions for Safe Use
1. **Never Share Credentials**: Your mock credentials (`admin@kivoc.co.za` / `password123`) should only be used in trusted environments.
2. **Clear Sessions**: Always click the **Logout** button when finishing your session to clear secure cookies.
3. **Browser Health**: Ensure you are using a modern, updated web browser to benefit from all security header protections.

## 📞 Reporting Vulnerabilities
If you discover a security vulnerability within the Kivoc System, please report it immediately to [security@kivoc.tech](mailto:security@kivoc.tech).
