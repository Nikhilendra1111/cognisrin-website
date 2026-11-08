# COGNISRIN — Cloudflare Pages Free Deployment Guide

This guide provides step-by-step instructions to deploy the Cognisrin official website (`cognisrin.in`) **completely free** on **Cloudflare Pages**, with zero server costs, unlimited bandwidth, global edge caching, and automated HTTPS.

---

## 1. Prerequisites (All 100% Free)
1. **GitHub Account** (Free plan)
2. **Cloudflare Account** (Free plan: [cloudflare.com](https://cloudflare.com))
3. **GoDaddy Account** where `cognisrin.in` is registered.
4. **Supabase Account** (Free plan: [supabase.com](https://supabase.com))

---

## 2. Push Code to Your GitHub Repository
1. Initialize Git in the project root:
   ```bash
   git init
   git add .
   git commit -m "Initial release of Cognisrin official organisation platform"
   ```
2. Create a new repository on your GitHub account named `cognisrin-website`.
3. Push your repository:
   ```bash
   git remote add origin https://github.com/<your-username>/cognisrin-website.git
   git branch -M main
   git push -u origin main
   ```

---

## 3. Deploy on Cloudflare Pages (Free Plan)
1. Log into [dash.cloudflare.com](https://dash.cloudflare.com).
2. On the left sidebar, navigate to **Workers & Pages**.
3. Click **Create Application** > Select the **Pages** tab > Click **Connect to Git**.
4. Select your GitHub repository (`cognisrin-website`).
5. In the **Set up builds and deployments** screen, configure the following:
   - **Project Name**: `cognisrin` (or your preferred name)
   - **Production branch**: `main`
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
6. Click **Save and Deploy**.
7. Cloudflare Pages will build the website in approximately 60 seconds and give you a free live URL: `https://cognisrin.pages.dev`.

> [!NOTE]
> Client-side routing is already pre-configured! The `public/_redirects` file automatically handles Single Page Application (SPA) routing on Cloudflare Pages so direct URLs like `https://cognisrin.in/founder/nikhilendra-srinivas` will reload cleanly without 404 errors.

---

## 4. Configuring Supabase Free Tier Backend
1. Go to [supabase.com](https://supabase.com) and create a free project named `Cognisrin`.
2. Once the database is provisioned, go to the **SQL Editor** on the left menu.
3. Open the file `supabase/schema.sql` from this codebase, copy its contents, paste it into the Supabase SQL Editor, and click **Run**.
   - This creates all tables (`profiles`, `founder_profile`, `publications`, `science_articles`, `innovation_projects`, `site_settings`, `contact_submissions`), along with Row Level Security (RLS) policies and initial seed records.
4. Navigate to **Project Settings** > **API**.
5. Copy your:
   - **Project URL** (`https://xyzcompany.supabase.co`)
   - **Project API Anon Key** (`eyJh...`)
6. In Cloudflare Pages:
   - Go to **Workers & Pages** > Select your `cognisrin` project.
   - Click **Settings** > **Environment variables**.
   - Add two production environment variables:
     - `VITE_SUPABASE_URL` = your Supabase Project URL
     - `VITE_SUPABASE_ANON_KEY` = your Supabase Anon Key
   - Trigger a redeployment or push any new commit.

---

## 5. Deploying Future Updates
Whenever you want to update the codebase:
1. Make your changes locally.
2. Commit and push to GitHub:
   ```bash
   git commit -am "Update features"
   git push
   ```
3. Cloudflare Pages automatically detects the commit, rebuilds the site, and deploys it globally within seconds at zero cost.
