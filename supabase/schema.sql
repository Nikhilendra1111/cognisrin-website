-- ==============================================================================
-- COGNISRIN (cognisrin.in) DATABASE SCHEMA
-- Compatible with Supabase Free Tier (PostgreSQL 15+)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'admin')),
  organization TEXT DEFAULT '',
  interests TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.founder_profile (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  full_name TEXT NOT NULL DEFAULT 'Nikhilendra Srinivas',
  designation TEXT NOT NULL DEFAULT 'Founder and Pioneer of Cognisrin',
  professional_identities TEXT[] NOT NULL DEFAULT ARRAY['Author', 'Entrepreneur', 'Science Enthusiast'],
  lectures_count INT NOT NULL DEFAULT 600,
  lectures_milestone_text TEXT NOT NULL DEFAULT '600+ Lectures Delivered Across India',
  photo_url TEXT DEFAULT '',
  biography_summary TEXT NOT NULL DEFAULT '',
  full_biography TEXT NOT NULL DEFAULT '',
  educational_background TEXT DEFAULT '',
  personal_journey TEXT DEFAULT '',
  scientific_interests TEXT[] DEFAULT '{}',
  entrepreneurial_interests TEXT[] DEFAULT '{}',
  vision_and_philosophy TEXT DEFAULT '',
  achievements TEXT[] DEFAULT '{}',
  social_links JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.publications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT DEFAULT '',
  author TEXT NOT NULL DEFAULT 'Nikhilendra Srinivas',
  description TEXT NOT NULL DEFAULT '',
  cover_image_url TEXT DEFAULT '',
  amazon_purchase_url TEXT DEFAULT '',
  publication_date TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'Science & Innovation',
  isbn TEXT DEFAULT '',
  featured BOOLEAN NOT NULL DEFAULT true,
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.science_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL CHECK (category IN (
    'Quantum Physics',
    'Nuclear Science',
    'Nanotechnology',
    'Chemistry',
    'Physics',
    'Scientific Research',
    'Emerging Technologies'
  )),
  abstract TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Nikhilendra Srinivas',
  read_time_minutes INT NOT NULL DEFAULT 5,
  tags TEXT[] DEFAULT '{}',
  published_at DATE NOT NULL DEFAULT CURRENT_DATE,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.innovation_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  technical_details TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Concept' CHECK (status IN ('Active', 'Prototype', 'Research', 'Concept')),
  founder_attribution TEXT NOT NULL DEFAULT 'Founder & Pioneer Nikhilendra Srinivas',
  image_url TEXT DEFAULT '',
  published_at DATE NOT NULL DEFAULT CURRENT_DATE,
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.site_settings (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  organisation_name TEXT NOT NULL DEFAULT 'COGNISRIN',
  tagline TEXT NOT NULL DEFAULT 'Advancing Science. Inspiring Innovation. Empowering Entrepreneurship.',
  supporting_description TEXT NOT NULL DEFAULT 'An independent organisation dedicated to encouraging scientific exploration, technological innovation and entrepreneurial thinking.',
  official_domain TEXT NOT NULL DEFAULT 'https://cognisrin.in',
  official_email TEXT NOT NULL DEFAULT 'contact@cognisrin.in',
  mission_statement TEXT NOT NULL,
  vision_statement TEXT NOT NULL,
  founding_philosophy TEXT NOT NULL,
  three_pillars JSONB NOT NULL,
  announcement_banner JSONB DEFAULT '{"enabled": false, "text": ""}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  category TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed')),
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.founder_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.science_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.innovation_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id OR public.is_admin());
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Public can read founder profile" ON public.founder_profile FOR SELECT USING (true);
CREATE POLICY "Admin can update founder profile" ON public.founder_profile FOR UPDATE USING (public.is_admin());

CREATE POLICY "Public can read publications" ON public.publications FOR SELECT USING (true);
CREATE POLICY "Admin can modify publications" ON public.publications FOR ALL USING (public.is_admin());

CREATE POLICY "Public can read science articles" ON public.science_articles FOR SELECT USING (true);
CREATE POLICY "Admin can modify science articles" ON public.science_articles FOR ALL USING (public.is_admin());

CREATE POLICY "Public can read innovation projects" ON public.innovation_projects FOR SELECT USING (true);
CREATE POLICY "Admin can modify innovation projects" ON public.innovation_projects FOR ALL USING (public.is_admin());

CREATE POLICY "Public can read site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admin can update site settings" ON public.site_settings FOR UPDATE USING (public.is_admin());

CREATE POLICY "Public can insert contact messages" ON public.contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can view contact messages" ON public.contact_submissions FOR SELECT USING (public.is_admin());

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (new.id, new.email, COALESCE(new.raw_user_meta_data->>'full_name', ''), 'member')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ==============================================================================
-- INITIAL SEED RECORDS (Executes safely with ON CONFLICT DO NOTHING)
-- ==============================================================================

-- 1. Founder Profile Seed: Nikhilendra Srinivas
INSERT INTO public.founder_profile (
  id,
  full_name,
  designation,
  professional_identities,
  lectures_count,
  lectures_milestone_text,
  photo_url,
  biography_summary,
  full_biography,
  educational_background,
  personal_journey,
  scientific_interests,
  entrepreneurial_interests,
  vision_and_philosophy,
  achievements,
  social_links
) VALUES (
  1,
  'Nikhilendra Srinivas',
  'Founder and Pioneer of Cognisrin',
  ARRAY['Author', 'Entrepreneur', 'Science Enthusiast'],
  600,
  '600+ Lectures Delivered Across India',
  '',
  'Nikhilendra Srinivas is the Founder and Pioneer of Cognisrin, an independent organisation committed to encouraging scientific inquiry, technological innovation, and disciplined entrepreneurial thinking across India and beyond.',
  'Nikhilendra Srinivas is an author, entrepreneur, and science enthusiast who established Cognisrin as an institutional platform to bridge theoretical scientific exploration with pragmatic technological innovation and entrepreneurial execution. Guided by first-principles inquiry and a lifelong dedication to scientific exploration, he has actively inspired emerging minds and researchers through extensive nationwide engagements.\n\nHaving delivered more than 600 lectures across academic institutions, public symposiums, and research forums throughout India, Nikhilendra has continually championed the democratization of scientific curiosity and rigorous innovation. His published works, including ''The Entrepreneur Genesis'' and ''The Power Within – Quantum'', reflect his dual commitment to foundational scientific inquiry and institutional value creation.',
  'Details on academic foundations and specialized study modules are maintained in archival records and can be configured through the verified administrative portal.',
  'Driven by curiosity regarding fundamental physical principles and the mechanisms that translate scientific discoveries into societal wealth and institutional progress, Nikhilendra Srinivas formulated Cognisrin as an autonomous hub for multidisciplinary exploration. Over years of delivering hundreds of keynote lectures across India, he observed the acute necessity for an organisation that treats science, technological invention, and entrepreneurship not as isolated verticals, but as a continuous cycle of knowledge creation.',
  ARRAY['Quantum Physics & Quantum Mechanics Foundations', 'Nuclear Science & Applied Particle Dynamics', 'Nanotechnology & Advanced Material Structures', 'Chemical Physics & Molecular Engineering', 'Emerging Energy Systems & Deep-Tech Architectures'],
  ARRAY['Deep-Technology Incubation & IP Translation', 'First-Principles Enterprise Architecture', 'Sustainable Scientific Commercialization', 'High-Impact Applied Engineering Ventures', 'Institutional R&D Governance'],
  'Cognisrin rests upon the conviction that a society''s long-term prosperity is determined by its scientific curiosity, its appetite for engineering innovation, and its capacity to build resilient entrepreneurial institutions. By anchoring intellectual exploration in empirical truth, we seek to inspire generations of thinkers and builders.',
  ARRAY['600+ Lectures Delivered Across India on Science, Technology, and Entrepreneurship', 'Author of ''The Entrepreneur Genesis'' exploring foundational venture creation', 'Author of ''The Power Within – Quantum'' examining physical principles and mindset', 'Founder and Pioneer of Cognisrin: establishing an independent scientific and innovation ecosystem'],
  '{"linkedin": "https://linkedin.com", "twitter": "https://x.com", "email": "contact@cognisrin.in", "website": "https://cognisrin.in"}'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- 2. Publications Seed: Books by Nikhilendra Srinivas
INSERT INTO public.publications (
  title,
  subtitle,
  author,
  description,
  cover_image_url,
  amazon_purchase_url,
  publication_date,
  category,
  isbn,
  featured,
  notes
) VALUES 
(
  'The Entrepreneur Genesis',
  'Principles of Resilient Venture Creation & Strategic Innovation',
  'Nikhilendra Srinivas',
  'A foundational work examining the architecture of visionary enterprises. ''The Entrepreneur Genesis'' articulates a systematic framework for transitioning bold concepts into enduring institutions through first-principles discipline, rigorous execution, and value creation.',
  '',
  '',
  '2024',
  'Entrepreneurship & Innovation',
  'Available via official publisher channels',
  true,
  'Official work authored by Nikhilendra Srinivas, Founder and Pioneer of Cognisrin.'
),
(
  'The Power Within – Quantum',
  'Exploring Fundamental Realities, Energy Dynamics, and Modern Physics',
  'Nikhilendra Srinivas',
  'An intellectual exploration delving into quantum principles, physical dynamics, and the conceptual models governing micro-scale reality. Written for thinkers seeking to understand how fundamental physics reshapes modern technological and cognitive paradigms.',
  '',
  '',
  '2024',
  'Science & Physics',
  'Available via official publisher channels',
  true,
  'Official work authored by Nikhilendra Srinivas, Founder and Pioneer of Cognisrin.'
);

-- 3. Site Settings Seed
INSERT INTO public.site_settings (
  id,
  organisation_name,
  tagline,
  supporting_description,
  official_domain,
  official_email,
  mission_statement,
  vision_statement,
  founding_philosophy,
  three_pillars
) VALUES (
  1,
  'COGNISRIN',
  'Advancing Science. Inspiring Innovation. Empowering Entrepreneurship.',
  'An independent organisation dedicated to encouraging scientific exploration, technological innovation and entrepreneurial thinking.',
  'https://cognisrin.in',
  'contact@cognisrin.in',
  'To ignite rigorous scientific curiosity, cultivate pioneering engineering innovation, and empower entrepreneurial initiatives that solve foundational challenges and build long-term societal value.',
  'To establish an enduring global institution recognized for elevating scientific inquiry, nurturing visionary inventors, and translating discovery into technological and economic progress.',
  'Anchored in first-principles thinking and championed by Founder and Pioneer Nikhilendra Srinivas, Cognisrin operates on the principle that sustainable civilizational advancement requires an unbroken continuum between theoretical science, applied technology, and principled enterprise.',
  '{"science": "Encouraging empirical inquiry, foundational research in physics, chemistry, nanotechnology, and quantum systems to expand the boundaries of human knowledge.", "innovation": "Developing experimental prototypes, engineering novel technology concepts, and fostering an environment where bold ideas transform into tangible technological advancements.", "entrepreneurship": "Empowering visionary builders with resilient venture frameworks, deep-tech incubation paradigms, and practical execution methodologies to create lasting institutional value."}'::jsonb
) ON CONFLICT (id) DO NOTHING;
