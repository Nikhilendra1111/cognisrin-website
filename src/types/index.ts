export type ScienceCategory = 
  | 'Quantum Physics'
  | 'Nuclear Science'
  | 'Nanotechnology'
  | 'Chemistry'
  | 'Physics'
  | 'Scientific Research'
  | 'Emerging Technologies';

export interface FounderProfile {
  fullName: string;
  designation: string;
  professionalIdentities: string[];
  lecturesCount: number;
  lecturesMilestoneText: string;
  photoUrl: string;
  biographySummary: string;
  fullBiography: string;
  educationalBackground: string;
  personalJourney: string;
  scientificInterests: string[];
  entrepreneurialInterests: string[];
  visionAndPhilosophy: string;
  achievements: string[];
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    email?: string;
    researchgate?: string;
    website?: string;
  };
  updatedAt: string;
}

export interface Publication {
  id: string;
  title: string;
  author: string;
  subtitle?: string;
  description: string;
  coverImageUrl?: string;
  amazonPurchaseUrl: string;
  publicationDate: string;
  category: string;
  isbn?: string;
  featured: boolean;
  notes?: string;
}

export interface ScienceArticle {
  id: string;
  title: string;
  slug: string;
  category: ScienceCategory;
  abstract: string;
  content: string;
  author: string;
  readTimeMinutes: number;
  tags: string[];
  publishedAt: string;
  featured?: boolean;
}

export type ProjectStatus = 'Active' | 'Prototype' | 'Research' | 'Concept';

export interface InnovationProject {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  technicalDetails: string;
  status: ProjectStatus;
  founderAttribution: string;
  imageUrl?: string;
  publishedAt: string;
  tags: string[];
  featured?: boolean;
}

export interface SiteSettings {
  organisationName: string;
  tagline: string;
  supportingDescription: string;
  officialDomain: string;
  officialEmail: string;
  missionStatement: string;
  visionStatement: string;
  foundingPhilosophy: string;
  threePillars: {
    science: string;
    innovation: string;
    entrepreneurship: string;
  };
  announcementBanner?: {
    enabled: boolean;
    text: string;
    linkUrl?: string;
  };
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: 'admin' | 'member';
  organization?: string;
  interests?: string[];
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  category: 'General' | 'Research Collaboration' | 'Lecture Invitation' | 'Innovation / Startup';
  message: string;
  submittedAt: string;
  status: 'new' | 'reviewed';
}
