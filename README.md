# COGNISRIN — Official Organisation Website

Official web platform for **COGNISRIN** (`https://cognisrin.in`), an independent organisation dedicated to encouraging and advancing **Science**, **Innovation**, and **Entrepreneurship**.

- **Founder & Pioneer**: **Nikhilendra Srinivas** (Author, Entrepreneur, Science Enthusiast)
- **Key Achievement**: **600+ Lectures Delivered Across India**
- **Published Works**: *The Entrepreneur Genesis* & *The Power Within – Quantum*

---

## Architecture & Technology Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide Icons, React Router DOM v6
- **Hosting**: 100% Free Hosting via **Cloudflare Pages**
- **Backend & Database**: **Supabase** Free Plan (PostgreSQL, Supabase Auth, Row Level Security)
- **Storage**: Supabase Storage
- **SEO & Structured Data**: JSON-LD Person (Nikhilendra Srinivas), Organization (Cognisrin), and Book schemas

---

## Local Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.

---

## Administrator Dashboard
Access the secure Administrator Dashboard at `/admin`.
In local preview mode, you can click **"Log In as Admin"** on the login page (`/auth/login`) to manage:
- Founder Biography & Personal Journey
- 600+ Lectures Count (Dynamic numeric counter)
- Publications, Cover Images, and Amazon Links
- Science Research Papers (across 7 categories)
- Innovation Projects & Development Statuses
- Organisation Mission, Vision, and Core Pillars

---

## Deployment & Custom Domain
- Refer to [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for step-by-step Cloudflare Pages setup.
- Refer to [GODADDY_DNS_GUIDE.md](./GODADDY_DNS_GUIDE.md) for connecting `cognisrin.in` through GoDaddy.
