import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  FounderProfile,
  Publication,
  ScienceArticle,
  InnovationProject,
  SiteSettings,
  ContactMessage
} from '../types';
import {
  initialFounderProfile,
  initialPublications,
  initialArticles,
  initialInnovationProjects,
  initialSiteSettings
} from '../lib/mockData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface ContentContextType {
  founderProfile: FounderProfile;
  publications: Publication[];
  articles: ScienceArticle[];
  projects: InnovationProject[];
  siteSettings: SiteSettings;
  contactMessages: ContactMessage[];
  isCloudSynced: boolean;
  
  // Mutations
  updateFounderProfile: (profile: Partial<FounderProfile>) => Promise<void>;
  addPublication: (publication: Omit<Publication, 'id'>) => Promise<void>;
  updatePublication: (id: string, updates: Partial<Publication>) => Promise<void>;
  deletePublication: (id: string) => Promise<void>;
  
  addArticle: (article: Omit<ScienceArticle, 'id'>) => Promise<void>;
  updateArticle: (id: string, updates: Partial<ScienceArticle>) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
  
  addProject: (project: Omit<InnovationProject, 'id'>) => Promise<void>;
  updateProject: (id: string, updates: Partial<InnovationProject>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  
  updateSiteSettings: (settings: Partial<SiteSettings>) => Promise<void>;
  submitContactMessage: (msg: Omit<ContactMessage, 'id' | 'submittedAt' | 'status'>) => Promise<void>;
  resetToDefaults: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const STORAGE_KEYS = {
  FOUNDER: 'cognisrin_data_founder',
  PUBLICATIONS: 'cognisrin_data_publications',
  ARTICLES: 'cognisrin_data_articles',
  PROJECTS: 'cognisrin_data_projects',
  SETTINGS: 'cognisrin_data_settings',
  MESSAGES: 'cognisrin_data_messages',
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [founderProfile, setFounderProfile] = useState<FounderProfile>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.FOUNDER);
      return stored ? JSON.parse(stored) : initialFounderProfile;
    } catch {
      return initialFounderProfile;
    }
  });

  const [publications, setPublications] = useState<Publication[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PUBLICATIONS);
      if (stored) {
        const parsed: Publication[] = JSON.parse(stored);
        const merged = parsed.map(p => {
          const init = initialPublications.find(ip => ip.id === p.id);
          if (init && (!p.amazonPurchaseUrl || p.amazonPurchaseUrl.trim() === '')) {
            return { ...p, amazonPurchaseUrl: init.amazonPurchaseUrl };
          }
          return p;
        });
        localStorage.setItem(STORAGE_KEYS.PUBLICATIONS, JSON.stringify(merged));
        return merged;
      }
      return initialPublications;
    } catch {
      return initialPublications;
    }
  });

  const [articles, setArticles] = useState<ScienceArticle[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ARTICLES);
      return stored ? JSON.parse(stored) : initialArticles;
    } catch {
      return initialArticles;
    }
  });

  const [projects, setProjects] = useState<InnovationProject[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      return stored ? JSON.parse(stored) : initialInnovationProjects;
    } catch {
      return initialInnovationProjects;
    }
  });

  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return stored ? JSON.parse(stored) : initialSiteSettings;
    } catch {
      return initialSiteSettings;
    }
  });

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Sync with Supabase on mount if configured
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      loadFromSupabase();
    }
  }, []);

  const loadFromSupabase = async () => {
    if (!supabase) return;
    try {
      // 1. Founder
      const { data: founderData } = await supabase.from('founder_profile').select('*').single();
      if (founderData) {
        const mappedFounder: FounderProfile = {
          fullName: founderData.full_name,
          designation: founderData.designation,
          professionalIdentities: founderData.professional_identities || initialFounderProfile.professionalIdentities,
          lecturesCount: founderData.lectures_count,
          lecturesMilestoneText: founderData.lectures_milestone_text,
          photoUrl: founderData.photo_url || '',
          biographySummary: founderData.biography_summary,
          fullBiography: founderData.full_biography,
          educationalBackground: founderData.educational_background || '',
          personalJourney: founderData.personal_journey || '',
          scientificInterests: founderData.scientific_interests || [],
          entrepreneurialInterests: founderData.entrepreneurial_interests || [],
          visionAndPhilosophy: founderData.vision_and_philosophy || '',
          achievements: founderData.achievements || [],
          socialLinks: founderData.social_links || initialFounderProfile.socialLinks,
          updatedAt: founderData.updated_at
        };
        setFounderProfile(mappedFounder);
        localStorage.setItem(STORAGE_KEYS.FOUNDER, JSON.stringify(mappedFounder));
      }

      // 2. Publications
      const { data: pubsData } = await supabase.from('publications').select('*').order('created_at', { ascending: false });
      if (pubsData && pubsData.length > 0) {
        const mappedPubs: Publication[] = pubsData.map((p: any) => ({
          id: p.id,
          title: p.title,
          subtitle: p.subtitle,
          author: p.author,
          description: p.description,
          coverImageUrl: p.cover_image_url,
          amazonPurchaseUrl: p.amazon_purchase_url,
          publicationDate: p.publication_date,
          category: p.category,
          isbn: p.isbn,
          featured: p.featured,
          notes: p.notes
        }));
        setPublications(mappedPubs);
        localStorage.setItem(STORAGE_KEYS.PUBLICATIONS, JSON.stringify(mappedPubs));
      }

      // 3. Articles
      const { data: artsData } = await supabase.from('science_articles').select('*').order('created_at', { ascending: false });
      if (artsData && artsData.length > 0) {
        const mappedArts: ScienceArticle[] = artsData.map((a: any) => ({
          id: a.id,
          title: a.title,
          slug: a.slug,
          category: a.category,
          abstract: a.abstract,
          content: a.content,
          author: a.author,
          readTimeMinutes: a.read_time_minutes,
          tags: a.tags || [],
          publishedAt: a.published_at,
          featured: a.featured
        }));
        setArticles(mappedArts);
        localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(mappedArts));
      }

      // 4. Projects
      const { data: projData } = await supabase.from('innovation_projects').select('*').order('created_at', { ascending: false });
      if (projData && projData.length > 0) {
        const mappedProj: InnovationProject[] = projData.map((pr: any) => ({
          id: pr.id,
          title: pr.title,
          slug: pr.slug,
          category: pr.category,
          description: pr.description,
          technicalDetails: pr.technical_details,
          status: pr.status,
          founderAttribution: pr.founder_attribution,
          imageUrl: pr.image_url,
          publishedAt: pr.published_at,
          tags: pr.tags || [],
          featured: pr.featured
        }));
        setProjects(mappedProj);
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(mappedProj));
      }
    } catch {
      // Graceful fallback to cached/initial
    }
  };

  // Founder Profile Mutation
  const updateFounderProfile = async (updates: Partial<FounderProfile>) => {
    const updated = {
      ...founderProfile,
      ...updates,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setFounderProfile(updated);
    localStorage.setItem(STORAGE_KEYS.FOUNDER, JSON.stringify(updated));

    if (isSupabaseConfigured && supabase) {
      await supabase.from('founder_profile').upsert({
        id: 1,
        full_name: updated.fullName,
        designation: updated.designation,
        professional_identities: updated.professionalIdentities,
        lectures_count: updated.lecturesCount,
        lectures_milestone_text: updated.lecturesMilestoneText,
        photo_url: updated.photoUrl,
        biography_summary: updated.biographySummary,
        full_biography: updated.fullBiography,
        educational_background: updated.educationalBackground,
        personal_journey: updated.personalJourney,
        scientific_interests: updated.scientificInterests,
        entrepreneurial_interests: updated.entrepreneurialInterests,
        vision_and_philosophy: updated.visionAndPhilosophy,
        achievements: updated.achievements,
        social_links: updated.socialLinks,
        updated_at: new Date().toISOString()
      });
    }
  };

  // Publications Mutations
  const addPublication = async (pub: Omit<Publication, 'id'>) => {
    const newId = 'pub-' + Date.now();
    const newPub: Publication = { ...pub, id: newId };
    const updated = [newPub, ...publications];
    setPublications(updated);
    localStorage.setItem(STORAGE_KEYS.PUBLICATIONS, JSON.stringify(updated));

    if (isSupabaseConfigured && supabase) {
      await supabase.from('publications').insert({
        title: pub.title,
        subtitle: pub.subtitle || '',
        author: pub.author,
        description: pub.description,
        cover_image_url: pub.coverImageUrl || '',
        amazon_purchase_url: pub.amazonPurchaseUrl || '',
        publication_date: pub.publicationDate,
        category: pub.category,
        isbn: pub.isbn || '',
        featured: pub.featured ?? true,
        notes: pub.notes || ''
      });
    }
  };

  const updatePublication = async (id: string, updates: Partial<Publication>) => {
    const updated = publications.map(p => p.id === id ? { ...p, ...updates } : p);
    setPublications(updated);
    localStorage.setItem(STORAGE_KEYS.PUBLICATIONS, JSON.stringify(updated));

    if (isSupabaseConfigured && supabase) {
      await supabase.from('publications').update({
        title: updates.title,
        subtitle: updates.subtitle,
        author: updates.author,
        description: updates.description,
        cover_image_url: updates.coverImageUrl,
        amazon_purchase_url: updates.amazonPurchaseUrl,
        publication_date: updates.publicationDate,
        category: updates.category,
        isbn: updates.isbn,
        featured: updates.featured,
        notes: updates.notes,
        updated_at: new Date().toISOString()
      }).eq('id', id);
    }
  };

  const deletePublication = async (id: string) => {
    const updated = publications.filter(p => p.id !== id);
    setPublications(updated);
    localStorage.setItem(STORAGE_KEYS.PUBLICATIONS, JSON.stringify(updated));

    if (isSupabaseConfigured && supabase) {
      await supabase.from('publications').delete().eq('id', id);
    }
  };

  // Articles Mutations
  const addArticle = async (art: Omit<ScienceArticle, 'id'>) => {
    const newId = 'art-' + Date.now();
    const newArt: ScienceArticle = { ...art, id: newId };
    const updated = [newArt, ...articles];
    setArticles(updated);
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(updated));

    if (isSupabaseConfigured && supabase) {
      await supabase.from('science_articles').insert({
        title: art.title,
        slug: art.slug,
        category: art.category,
        abstract: art.abstract,
        content: art.content,
        author: art.author,
        read_time_minutes: art.readTimeMinutes,
        tags: art.tags,
        published_at: art.publishedAt,
        featured: art.featured ?? false
      });
    }
  };

  const updateArticle = async (id: string, updates: Partial<ScienceArticle>) => {
    const updated = articles.map(a => a.id === id ? { ...a, ...updates } : a);
    setArticles(updated);
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(updated));

    if (isSupabaseConfigured && supabase) {
      await supabase.from('science_articles').update({
        title: updates.title,
        slug: updates.slug,
        category: updates.category,
        abstract: updates.abstract,
        content: updates.content,
        author: updates.author,
        read_time_minutes: updates.readTimeMinutes,
        tags: updates.tags,
        published_at: updates.publishedAt,
        featured: updates.featured
      }).eq('id', id);
    }
  };

  const deleteArticle = async (id: string) => {
    const updated = articles.filter(a => a.id !== id);
    setArticles(updated);
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(updated));

    if (isSupabaseConfigured && supabase) {
      await supabase.from('science_articles').delete().eq('id', id);
    }
  };

  // Projects Mutations
  const addProject = async (proj: Omit<InnovationProject, 'id'>) => {
    const newId = 'proj-' + Date.now();
    const newProj: InnovationProject = { ...proj, id: newId };
    const updated = [newProj, ...projects];
    setProjects(updated);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));

    if (isSupabaseConfigured && supabase) {
      await supabase.from('innovation_projects').insert({
        title: proj.title,
        slug: proj.slug,
        category: proj.category,
        description: proj.description,
        technical_details: proj.technicalDetails,
        status: proj.status,
        founder_attribution: proj.founderAttribution,
        image_url: proj.imageUrl || '',
        published_at: proj.publishedAt,
        tags: proj.tags,
        featured: proj.featured ?? false
      });
    }
  };

  const updateProject = async (id: string, updates: Partial<InnovationProject>) => {
    const updated = projects.map(p => p.id === id ? { ...p, ...updates } : p);
    setProjects(updated);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));

    if (isSupabaseConfigured && supabase) {
      await supabase.from('innovation_projects').update({
        title: updates.title,
        slug: updates.slug,
        category: updates.category,
        description: updates.description,
        technical_details: updates.technicalDetails,
        status: updates.status,
        founder_attribution: updates.founderAttribution,
        image_url: updates.imageUrl,
        published_at: updates.publishedAt,
        tags: updates.tags,
        featured: updates.featured
      }).eq('id', id);
    }
  };

  const deleteProject = async (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));

    if (isSupabaseConfigured && supabase) {
      await supabase.from('innovation_projects').delete().eq('id', id);
    }
  };

  // Site Settings
  const updateSiteSettings = async (updates: Partial<SiteSettings>) => {
    const updated = { ...siteSettings, ...updates };
    setSiteSettings(updated);
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));

    if (isSupabaseConfigured && supabase) {
      await supabase.from('site_settings').upsert({
        id: 1,
        organisation_name: updated.organisationName,
        tagline: updated.tagline,
        supporting_description: updated.supportingDescription,
        official_domain: updated.officialDomain,
        official_email: updated.officialEmail,
        mission_statement: updated.missionStatement,
        vision_statement: updated.visionStatement,
        founding_philosophy: updated.foundingPhilosophy,
        three_pillars: updated.threePillars,
        announcement_banner: updated.announcementBanner,
        updated_at: new Date().toISOString()
      });
    }
  };

  // Contact Submission
  const submitContactMessage = async (msg: Omit<ContactMessage, 'id' | 'submittedAt' | 'status'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: 'msg-' + Date.now(),
      submittedAt: new Date().toISOString(),
      status: 'new'
    };
    const updated = [newMsg, ...contactMessages];
    setContactMessages(updated);
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));

    if (isSupabaseConfigured && supabase) {
      await supabase.from('contact_submissions').insert({
        name: msg.name,
        email: msg.email,
        subject: msg.subject,
        category: msg.category,
        message: msg.message,
        status: 'new'
      });
    }
  };

  // Reset to default
  const resetToDefaults = () => {
    setFounderProfile(initialFounderProfile);
    setPublications(initialPublications);
    setArticles(initialArticles);
    setProjects(initialInnovationProjects);
    setSiteSettings(initialSiteSettings);
    localStorage.removeItem(STORAGE_KEYS.FOUNDER);
    localStorage.removeItem(STORAGE_KEYS.PUBLICATIONS);
    localStorage.removeItem(STORAGE_KEYS.ARTICLES);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
  };

  return (
    <ContentContext.Provider
      value={{
        founderProfile,
        publications,
        articles,
        projects,
        siteSettings,
        contactMessages,
        isCloudSynced: isSupabaseConfigured,
        updateFounderProfile,
        addPublication,
        updatePublication,
        deletePublication,
        addArticle,
        updateArticle,
        deleteArticle,
        addProject,
        updateProject,
        deleteProject,
        updateSiteSettings,
        submitContactMessage,
        resetToDefaults
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
