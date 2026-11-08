-- ==============================================================================
-- COGNISRIN — Supabase PostgreSQL Schema & Security Rules + Initial Seed
-- Run this script in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/wynxtfrbbakgdvxcxjqi/sql/new
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

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

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

DROP POLICY IF EXISTS "Founder profile is viewable by everyone" ON public.founder_profile;
CREATE POLICY "Founder profile is viewable by everyone" 
  ON public.founder_profile FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can update founder profile" ON public.founder_profile;
CREATE POLICY "Anyone can update founder profile" 
  ON public.founder_profile FOR ALL USING (true) WITH CHECK (true);


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

DROP POLICY IF EXISTS "Publications viewable by everyone" ON public.publications;
CREATE POLICY "Publications viewable by everyone" 
  ON public.publications FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can modify publications" ON public.publications;
CREATE POLICY "Anyone can modify publications" 
  ON public.publications FOR ALL USING (true) WITH CHECK (true);


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

DROP POLICY IF EXISTS "Articles viewable by everyone" ON public.articles;
CREATE POLICY "Articles viewable by everyone" 
  ON public.articles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can modify articles" ON public.articles;
CREATE POLICY "Anyone can modify articles" 
  ON public.articles FOR ALL USING (true) WITH CHECK (true);


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

DROP POLICY IF EXISTS "Projects viewable by everyone" ON public.projects;
CREATE POLICY "Projects viewable by everyone" 
  ON public.projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can modify projects" ON public.projects;
CREATE POLICY "Anyone can modify projects" 
  ON public.projects FOR ALL USING (true) WITH CHECK (true);


-- 6. Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'cognisrin-settings',
  tagline TEXT,
  supporting_description TEXT,
  three_pillars JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Site settings viewable by everyone" ON public.site_settings;
CREATE POLICY "Site settings viewable by everyone" 
  ON public.site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can modify site settings" ON public.site_settings;
CREATE POLICY "Anyone can modify site settings" 
  ON public.site_settings FOR ALL USING (true) WITH CHECK (true);


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

DROP POLICY IF EXISTS "Anyone can submit a contact message" ON public.contact_messages;
CREATE POLICY "Anyone can submit a contact message" 
  ON public.contact_messages FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can view contact messages" ON public.contact_messages;
CREATE POLICY "Anyone can view contact messages" 
  ON public.contact_messages FOR SELECT USING (true);


-- ==============================================================================
-- INITIAL SEED DATA
-- ==============================================================================

-- Seed Founder Profile
INSERT INTO public.founder_profile (
  id, full_name, designation, professional_identities, lectures_count, 
  lectures_milestone_text, photo_url, biography_summary, full_biography, 
  educational_background, personal_journey, scientific_interests, 
  entrepreneurial_interests, vision_and_philosophy, achievements, social_links
) VALUES (
  'cognisrin-founder',
  'Nikhilendra Srinivas',
  'Founder and Pioneer of Cognisrin',
  ARRAY['Author', 'Entrepreneur', 'Science Enthusiast'],
  600,
  '600+ Lectures Delivered Across India',
  '/images/founder-portrait.jpg',
  'Nikhilendra Srinivas is the Founder and Pioneer of Cognisrin, an independent organisation committed to encouraging scientific inquiry, technological innovation, and disciplined entrepreneurial thinking across India and beyond.',
  'Nikhilendra Srinivas is an author, entrepreneur, and science enthusiast who established Cognisrin as an institutional platform to bridge theoretical scientific exploration with pragmatic technological innovation and entrepreneurial execution. Guided by first-principles inquiry and a lifelong dedication to scientific exploration, he has actively inspired emerging minds and researchers through extensive nationwide engagements.\n\nHaving delivered more than 600 lectures across academic institutions, public symposiums, and research forums throughout India, Nikhilendra has continually championed the democratization of scientific curiosity and rigorous innovation. His published works, including ''The Entrepreneur Genesis'' and ''The Power Within – Quantum'', reflect his dual commitment to foundational scientific inquiry and institutional value creation.',
  'Currently pursuing Undergraduate studies at Osmania University, Telangana. Actively engaged in theoretical physics exploration, enterprise development frameworks, and scientific lecturing nationwide.',
  'Driven by curiosity regarding fundamental physical principles and the mechanisms that translate scientific discoveries into societal wealth and institutional progress, Nikhilendra Srinivas formulated Cognisrin as an autonomous hub for multidisciplinary exploration.',
  ARRAY['Quantum Physics & Quantum Mechanics Foundations', 'Nuclear Science & Applied Particle Dynamics', 'Nanotechnology & Advanced Material Structures', 'Chemical Physics & Molecular Engineering', 'Emerging Energy Systems & Deep-Tech Architectures'],
  ARRAY['Deep-Technology Incubation & IP Translation', 'First-Principles Enterprise Architecture', 'Sustainable Scientific Commercialization', 'High-Impact Applied Engineering Ventures', 'Institutional R&D Governance'],
  'Cognisrin rests upon the conviction that a society''s long-term prosperity is determined by its scientific curiosity, its appetite for engineering innovation, and its capacity to build resilient entrepreneurial institutions.',
  ARRAY['600+ Lectures Delivered Across India on Science, Technology, and Entrepreneurship', 'Author of ''The Entrepreneur Genesis'' exploring foundational venture creation', 'Author of ''The Power Within – Quantum'' examining physical principles and mindset', 'Founder and Pioneer of Cognisrin'],
  '{"email": "nikhilendrasrinivas5@gmail.com", "website": "https://cognisrin.in", "linkedin": "https://linkedin.com", "twitter": "https://x.com"}'::jsonb
) ON CONFLICT (id) DO UPDATE SET full_name = EXCLUDED.full_name;

-- Seed Publications
INSERT INTO public.publications (
  id, title, subtitle, author, description, cover_image_url, amazon_purchase_url, publication_date, category, isbn, featured
) VALUES 
(
  'pub-1',
  'The Entrepreneur Genesis',
  'Principles of Resilient Venture Creation & Strategic Innovation',
  'Nikhilendra Srinivas',
  'A foundational work examining the architecture of visionary enterprises. ''The Entrepreneur Genesis'' articulates a systematic framework for transitioning bold concepts into enduring institutions through first-principles discipline, rigorous execution, and value creation.',
  '/images/covers/the-entrepreneur-genesis.jpg',
  'https://www.amazon.in/Entrepreneur-Genesis-Nikhilendra-srinivas-ebook/dp/B0DV8X9X23',
  '2024',
  'Entrepreneurship & Innovation',
  'Available via official publisher channels',
  true
),
(
  'pub-2',
  'The Power Within – Quantum',
  'Exploring Fundamental Realities, Energy Dynamics, and Modern Physics',
  'Nikhilendra Srinivas',
  'An intellectual exploration delving into quantum principles, physical dynamics, and the conceptual models governing micro-scale reality. Written for thinkers seeking to understand how fundamental physics reshapes modern technological and cognitive paradigms.',
  '/images/covers/the-power-within-quantum.jpg',
  'https://www.amazon.com/gp/product/B0HP658MVL',
  '2024',
  'Science & Physics',
  'Available via official publisher channels',
  true
) ON CONFLICT (id) DO NOTHING;

-- Seed Site Settings
INSERT INTO public.site_settings (
  id, tagline, supporting_description, three_pillars
) VALUES (
  'cognisrin-settings',
  'Advancing Science. Inspiring Innovation. Empowering Entrepreneurship.',
  'An independent institutional ecosystem founded and pioneered by Nikhilendra Srinivas to encourage fundamental scientific inquiry, foster pioneering technological development, and cultivate enduring entrepreneurial institutions.',
  '{"science": "Conducting first-principles research across quantum mechanics, advanced material physics, and nuclear energy systems to expand empirical knowledge boundaries.", "innovation": "Translating scientific breakthroughs into functional prototypes, scalable engineering platforms, and deep-tech inventions.", "entrepreneurship": "Structuring high-resilience organizational frameworks, venture methodologies, and institutional leadership paradigms."}'::jsonb
) ON CONFLICT (id) DO NOTHING;
