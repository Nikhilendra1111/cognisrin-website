-- ==============================================================================
-- COGNISRIN — Supabase PostgreSQL Schema & Security Rules
-- Run this script in the Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- ==============================================================================

-- 1. Profiles Table (Extends Supabase Auth users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  organization TEXT,
  interests TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Trigger to create profile automatically upon Supabase user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    CASE 
      WHEN lower(new.email) = 'nikhilendrasrinivas5@gmail.com' THEN 'admin'
      ELSE 'member'
    END
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- 2. Founder Profile Table
CREATE TABLE IF NOT EXISTS public.founder_profile (
  id TEXT PRIMARY KEY DEFAULT 'cognisrin-founder',
  full_name TEXT NOT NULL,
  designation TEXT NOT NULL,
  professional_identities TEXT[] DEFAULT '{}',
  lectures_count INT DEFAULT 600,
  lectures_milestone_text TEXT DEFAULT '600+ Lectures Delivered Across India',
  photo_url TEXT DEFAULT '',
  biography_summary TEXT,
  full_biography TEXT,
  educational_background TEXT,
  personal_journey TEXT,
  scientific_interests TEXT[] DEFAULT '{}',
  entrepreneurial_interests TEXT[] DEFAULT '{}',
  vision_and_philosophy TEXT,
  achievements TEXT[] DEFAULT '{}',
  social_links JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.founder_profile ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Founder profile is viewable by everyone" 
  ON public.founder_profile FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can update founder profile" 
  ON public.founder_profile FOR UPDATE USING (auth.role() = 'authenticated');


-- 3. Publications Table
CREATE TABLE IF NOT EXISTS public.publications (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  author TEXT NOT NULL,
  description TEXT,
  cover_image_url TEXT,
  amazon_purchase_url TEXT,
  publication_date TEXT,
  category TEXT,
  isbn TEXT,
  featured BOOLEAN DEFAULT true,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.publications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Publications viewable by everyone" 
  ON public.publications FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert publications" 
  ON public.publications FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update publications" 
  ON public.publications FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete publications" 
  ON public.publications FOR DELETE USING (auth.role() = 'authenticated');


-- 4. Science Articles Table
CREATE TABLE IF NOT EXISTS public.articles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  abstract TEXT,
  content TEXT,
  author TEXT NOT NULL,
  read_time_minutes INT DEFAULT 5,
  tags TEXT[] DEFAULT '{}',
  published_at TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Articles viewable by everyone" 
  ON public.articles FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert articles" 
  ON public.articles FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update articles" 
  ON public.articles FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete articles" 
  ON public.articles FOR DELETE USING (auth.role() = 'authenticated');


-- 5. Innovation Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  status TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  technical_brief TEXT,
  lead_researcher TEXT,
  founder_attribution TEXT,
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects viewable by everyone" 
  ON public.projects FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert projects" 
  ON public.projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update projects" 
  ON public.projects FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete projects" 
  ON public.projects FOR DELETE USING (auth.role() = 'authenticated');


-- 6. Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'cognisrin-settings',
  tagline TEXT,
  supporting_description TEXT,
  three_pillars JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Site settings viewable by everyone" 
  ON public.site_settings FOR SELECT USING (true);

CREATE POLICY "Authenticated users can update site settings" 
  ON public.site_settings FOR UPDATE USING (auth.role() = 'authenticated');


-- 7. Contact Messages Table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  category TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'unread'
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a contact message" 
  ON public.contact_messages FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact messages" 
  ON public.contact_messages FOR SELECT USING (auth.role() = 'authenticated');
