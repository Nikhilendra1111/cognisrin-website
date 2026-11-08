import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  User, 
  BookOpen, 
  Atom, 
  Lightbulb, 
  Settings, 
  Mail, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Check, 
  ExternalLink,
  Sparkles,
  Award,
  Layers,
  AlertTriangle,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useContent } from '../../context/ContentContext';
import { SEOHead } from '../../components/common/SEOHead';
import { Publication, ScienceArticle, InnovationProject, ScienceCategory, ProjectStatus } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { user, isAdmin, isCloudSynced, toggleDemoAdmin } = useAuth();
  const { 
    founderProfile, 
    updateFounderProfile,
    publications,
    addPublication,
    updatePublication,
    deletePublication,
    articles,
    addArticle,
    updateArticle,
    deleteArticle,
    projects,
    addProject,
    updateProject,
    deleteProject,
    siteSettings,
    updateSiteSettings,
    contactMessages
  } = useContent();

  const [activeTab, setActiveTab] = useState<'founder' | 'publications' | 'articles' | 'projects' | 'settings' | 'messages'>('founder');
  const [saveStatus, setSaveStatus] = useState<string>('');

  // 1. Founder Form State
  const [founderForm, setFounderForm] = useState({
    fullName: founderProfile.fullName,
    designation: founderProfile.designation,
    lecturesCount: founderProfile.lecturesCount,
    lecturesMilestoneText: founderProfile.lecturesMilestoneText,
    photoUrl: founderProfile.photoUrl,
    biographySummary: founderProfile.biographySummary,
    fullBiography: founderProfile.fullBiography,
    educationalBackground: founderProfile.educationalBackground,
    personalJourney: founderProfile.personalJourney,
    visionAndPhilosophy: founderProfile.visionAndPhilosophy,
    email: founderProfile.socialLinks.email || ''
  });

  // 2. Publication Modal / State
  const [showPubModal, setShowPubModal] = useState(false);
  const [editingPubId, setEditingPubId] = useState<string | null>(null);
  const [pubForm, setPubForm] = useState({
    title: '',
    subtitle: '',
    author: 'Nikhilendra Srinivas',
    description: '',
    coverImageUrl: '',
    amazonPurchaseUrl: '',
    publicationDate: '2024',
    category: 'Venture & Economics',
    isbn: ''
  });

  // 3. Article Modal / State
  const [showArtModal, setShowArtModal] = useState(false);
  const [editingArtId, setEditingArtId] = useState<string | null>(null);
  const [artForm, setArtForm] = useState({
    title: '',
    slug: '',
    category: 'Quantum Physics' as ScienceCategory,
    abstract: '',
    content: '',
    author: 'Nikhilendra Srinivas',
    readTimeMinutes: 7,
    tags: 'Quantum Mechanics, Physics'
  });

  // 4. Project Modal / State
  const [showProjModal, setShowProjModal] = useState(false);
  const [editingProjId, setEditingProjId] = useState<string | null>(null);
  const [projForm, setProjForm] = useState({
    title: '',
    slug: '',
    category: 'Quantum Technologies',
    description: '',
    technicalDetails: '',
    status: 'Research' as ProjectStatus,
    founderAttribution: 'Conceived & Guided by Nikhilendra Srinivas',
    imageUrl: '',
    publishedAt: new Date().toISOString().split('T')[0],
    tags: 'Technology, Research'
  });

  // Security Gate
  if (!isAdmin) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 bg-[#ffffff]">
        <div className="max-w-md w-full apple-card p-8 text-center space-y-4 border border-[#ff3b30]/30">
          <AlertTriangle className="w-12 h-12 text-[#ff9500] mx-auto" />
          <h2 className="text-xl font-semibold text-[#1d1d1f]">Executive Access Required</h2>
          <p className="text-xs text-[#86868b] leading-relaxed">
            This portal is restricted to authorized Cognisrin leadership.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={toggleDemoAdmin}
              className="apple-btn-primary text-xs"
            >
              Sign In to Executive Portal
            </button>
            <Link to="/auth/login" className="text-xs text-[#0066cc] hover:underline">
              Sign In with Credentials
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Save Founder Profile Handler
  const handleSaveFounder = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateFounderProfile({
      fullName: founderForm.fullName,
      designation: founderForm.designation,
      lecturesCount: Number(founderForm.lecturesCount),
      lecturesMilestoneText: founderForm.lecturesMilestoneText,
      photoUrl: founderForm.photoUrl,
      biographySummary: founderForm.biographySummary,
      fullBiography: founderForm.fullBiography,
      educationalBackground: founderForm.educationalBackground,
      personalJourney: founderForm.personalJourney,
      visionAndPhilosophy: founderForm.visionAndPhilosophy,
      socialLinks: {
        ...founderProfile.socialLinks,
        email: founderForm.email
      }
    });
    setSaveStatus('Founder Biography & Achievements updated successfully!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  // Publication Handlers
  const handleOpenPubModal = (pub?: Publication) => {
    if (pub) {
      setEditingPubId(pub.id);
      setPubForm({
        title: pub.title,
        subtitle: pub.subtitle || '',
        author: pub.author,
        description: pub.description,
        coverImageUrl: pub.coverImageUrl || '',
        amazonPurchaseUrl: pub.amazonPurchaseUrl || '',
        publicationDate: pub.publicationDate,
        category: pub.category,
        isbn: pub.isbn || ''
      });
    } else {
      setEditingPubId(null);
      setPubForm({
        title: '',
        subtitle: '',
        author: 'Nikhilendra Srinivas',
        description: '',
        coverImageUrl: '',
        amazonPurchaseUrl: '',
        publicationDate: '2024',
        category: 'Venture & Economics',
        isbn: ''
      });
    }
    setShowPubModal(true);
  };

  const handleSavePublication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPubId) {
      await updatePublication(editingPubId, { ...pubForm, featured: true });
      setSaveStatus('Publication updated successfully!');
    } else {
      await addPublication({ ...pubForm, featured: true });
      setSaveStatus('New publication added successfully!');
    }
    setShowPubModal(false);
    setTimeout(() => setSaveStatus(''), 3000);
  };

  // Article Handlers
  const handleOpenArtModal = (art?: ScienceArticle) => {
    if (art) {
      setEditingArtId(art.id);
      setArtForm({
        title: art.title,
        slug: art.slug,
        category: art.category,
        abstract: art.abstract,
        content: art.content,
        author: art.author,
        readTimeMinutes: art.readTimeMinutes,
        tags: art.tags.join(', ')
      });
    } else {
      setEditingArtId(null);
      setArtForm({
        title: '',
        slug: '',
        category: 'Quantum Physics',
        abstract: '',
        content: '',
        author: 'Nikhilendra Srinivas',
        readTimeMinutes: 7,
        tags: 'Quantum Mechanics, Physics'
      });
    }
    setShowArtModal(true);
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagArray = artForm.tags.split(',').map(t => t.trim()).filter(Boolean);
    const slug = artForm.slug.trim() || artForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (editingArtId) {
      await updateArticle(editingArtId, {
        ...artForm,
        slug,
        tags: tagArray
      });
      setSaveStatus('Article updated successfully!');
    } else {
      await addArticle({
        ...artForm,
        slug,
        tags: tagArray,
        publishedAt: new Date().toISOString().split('T')[0],
        featured: false
      });
      setSaveStatus('New scientific article published successfully!');
    }
    setShowArtModal(false);
    setTimeout(() => setSaveStatus(''), 3000);
  };

  // Project Handlers
  const handleOpenProjModal = (proj?: InnovationProject) => {
    if (proj) {
      setEditingProjId(proj.id);
      setProjForm({
        title: proj.title,
        slug: proj.slug,
        category: proj.category,
        description: proj.description,
        technicalDetails: proj.technicalDetails,
        status: proj.status,
        founderAttribution: proj.founderAttribution,
        imageUrl: proj.imageUrl || '',
        publishedAt: proj.publishedAt,
        tags: proj.tags.join(', ')
      });
    } else {
      setEditingProjId(null);
      setProjForm({
        title: '',
        slug: '',
        category: 'Clean Energy & Materials',
        description: '',
        technicalDetails: '',
        status: 'Research',
        founderAttribution: 'Conceived & Guided by Nikhilendra Srinivas',
        imageUrl: '',
        publishedAt: new Date().toISOString().split('T')[0],
        tags: 'Engineering, Prototype'
      });
    }
    setShowProjModal(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagArray = projForm.tags.split(',').map(t => t.trim()).filter(Boolean);
    const slug = projForm.slug.trim() || projForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (editingProjId) {
      await updateProject(editingProjId, {
        ...projForm,
        slug,
        tags: tagArray
      });
      setSaveStatus('Innovation project updated successfully!');
    } else {
      await addProject({
        ...projForm,
        slug,
        tags: tagArray,
        featured: false
      });
      setSaveStatus('New project registered successfully!');
    }
    setShowProjModal(false);
    setTimeout(() => setSaveStatus(''), 3000);
  };

  return (
    <div className="bg-[#ffffff] text-[#1d1d1f] min-h-screen py-12">
      <SEOHead
        title="Executive Management Portal"
        description="Executive management portal for Cognisrin."
        canonicalPath="/portal"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Banner */}
        <div className="apple-card p-8 border border-[#d2d2d7] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#34c759]/10 text-[#28a745] border border-[#34c759]/30 font-mono">
                EXECUTIVE DIRECTORATE
              </span>
              <span className="text-xs text-[#86868b] font-mono">
                {isCloudSynced ? '⚡ Cloud Synced (Supabase)' : '💾 Local Mode (Zero-Config)'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#1d1d1f] tracking-tight mt-1 font-mono">
              Cognisrin Content & Institutional Dashboard
            </h1>
            <p className="text-xs text-[#86868b] mt-1">
              Modify founder biography, 600+ lectures milestone, books, Amazon links, and scientific articles without touching code.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/" className="apple-btn-secondary px-4 py-2 text-xs">
              View Public Website
            </Link>
          </div>
        </div>

        {/* Status Toast */}
        {saveStatus && (
          <div className="p-4 rounded-2xl bg-[#34c759]/10 border border-[#34c759]/30 text-xs text-[#28a745] flex items-center gap-2 shadow-xs animate-in fade-in">
            <Check className="w-4 h-4" />
            <span className="font-semibold">{saveStatus}</span>
          </div>
        )}

        {/* Tabs Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 bg-[#f5f5f7] border border-[#d2d2d7] rounded-2xl">
          <button
            onClick={() => setActiveTab('founder')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'founder'
                ? 'bg-[#ffffff] text-[#1d1d1f] shadow-xs'
                : 'text-[#86868b] hover:text-[#1d1d1f]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Founder & Milestone</span>
          </button>

          <button
            onClick={() => setActiveTab('publications')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'publications'
                ? 'bg-[#ffffff] text-[#1d1d1f] shadow-xs'
                : 'text-[#86868b] hover:text-[#1d1d1f]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Publications ({publications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('articles')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'articles'
                ? 'bg-[#ffffff] text-[#1d1d1f] shadow-xs'
                : 'text-[#86868b] hover:text-[#1d1d1f]'
            }`}
          >
            <Atom className="w-3.5 h-3.5" />
            <span>Science Articles ({articles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'projects'
                ? 'bg-[#ffffff] text-[#1d1d1f] shadow-xs'
                : 'text-[#86868b] hover:text-[#1d1d1f]'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Innovations ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'settings'
                ? 'bg-[#ffffff] text-[#1d1d1f] shadow-xs'
                : 'text-[#86868b] hover:text-[#1d1d1f]'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Site Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'messages'
                ? 'bg-[#ffffff] text-[#1d1d1f] shadow-xs'
                : 'text-[#86868b] hover:text-[#1d1d1f]'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Messages ({contactMessages.length})</span>
          </button>
        </div>

        {/* Tab 1: Founder */}
        {activeTab === 'founder' && (
          <div className="apple-card p-8 sm:p-10 space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-[#1d1d1f] tracking-tight">Founder Profile & Institutional Identity</h3>
              <p className="text-xs text-[#86868b]">Control the executive information displayed across all official public pages.</p>
            </div>

            <form onSubmit={handleSaveFounder} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#515154]">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={founderForm.fullName}
                    onChange={(e) => setFounderForm({ ...founderForm, fullName: e.target.value })}
                    className="apple-input w-full"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#515154]">Official Designation *</label>
                  <input
                    type="text"
                    required
                    value={founderForm.designation}
                    onChange={(e) => setFounderForm({ ...founderForm, designation: e.target.value })}
                    className="apple-input w-full"
                  />
                </div>
              </div>

              {/* 600+ Lectures Milestone Control */}
              <div className="p-6 rounded-2xl bg-[#ffffff] border border-[#d2d2d7] space-y-4">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#0071e3]" />
                  <h4 className="text-sm font-semibold text-[#1d1d1f]">Keynote Lectures Milestone Configuration</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#515154]">Delivered Lectures Count (Number)</label>
                    <input
                      type="number"
                      required
                      value={founderForm.lecturesCount}
                      onChange={(e) => setFounderForm({ ...founderForm, lecturesCount: Number(e.target.value) })}
                      className="apple-input w-full"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#515154]">Public Milestone Headline Text</label>
                    <input
                      type="text"
                      required
                      value={founderForm.lecturesMilestoneText}
                      onChange={(e) => setFounderForm({ ...founderForm, lecturesMilestoneText: e.target.value })}
                      className="apple-input w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#515154]">Official Portrait Image URL (Leave blank to use Apple Placeholder)</label>
                <input
                  type="text"
                  value={founderForm.photoUrl}
                  onChange={(e) => setFounderForm({ ...founderForm, photoUrl: e.target.value })}
                  placeholder="https://..."
                  className="apple-input w-full"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#515154]">Executive Biography Summary *</label>
                <textarea
                  rows={3}
                  required
                  value={founderForm.biographySummary}
                  onChange={(e) => setFounderForm({ ...founderForm, biographySummary: e.target.value })}
                  className="apple-input w-full resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#515154]">Full Biography *</label>
                <textarea
                  rows={6}
                  required
                  value={founderForm.fullBiography}
                  onChange={(e) => setFounderForm({ ...founderForm, fullBiography: e.target.value })}
                  className="apple-input w-full resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#515154]">Academic Disciplines</label>
                  <input
                    type="text"
                    value={founderForm.educationalBackground}
                    onChange={(e) => setFounderForm({ ...founderForm, educationalBackground: e.target.value })}
                    className="apple-input w-full"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#515154]">Institutional Philosophy</label>
                  <input
                    type="text"
                    value={founderForm.visionAndPhilosophy}
                    onChange={(e) => setFounderForm({ ...founderForm, visionAndPhilosophy: e.target.value })}
                    className="apple-input w-full"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button type="submit" className="apple-btn-primary text-xs">
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Founder Profile Changes</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 2: Publications */}
        {activeTab === 'publications' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-[#1d1d1f]">Scholarly Books & Publications</h3>
                <p className="text-xs text-[#86868b]">Manage books authored by Nikhilendra Srinivas with Amazon links.</p>
              </div>
              <button
                onClick={() => handleOpenPubModal()}
                className="apple-btn-primary text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Publication</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {publications.map((pub) => (
                <div key={pub.id} className="apple-card p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-mono text-[#0066cc] font-semibold">{pub.category}</span>
                    <h4 className="text-lg font-semibold text-[#1d1d1f]">{pub.title}</h4>
                    {pub.subtitle && <p className="text-xs text-[#86868b] italic">{pub.subtitle}</p>}
                    <p className="text-xs text-[#515154] line-clamp-3">{pub.description}</p>
                    <p className="text-[11px] font-mono text-[#86868b]">Author: {pub.author} • Date: {pub.publicationDate}</p>
                    {pub.amazonPurchaseUrl && (
                      <p className="text-[11px] text-[#0066cc] truncate">Amazon: {pub.amazonPurchaseUrl}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-4 border-t border-[rgba(0,0,0,0.06)]">
                    <button
                      onClick={() => handleOpenPubModal(pub)}
                      className="p-2 rounded-lg bg-[#ffffff] border border-[#d2d2d7] hover:border-[#0071e3] text-[#1d1d1f] text-xs flex items-center gap-1 shadow-xs"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#0071e3]" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => deletePublication(pub.id)}
                      className="p-2 rounded-lg bg-[#ffffff] border border-[#d2d2d7] hover:border-[#ff3b30] text-[#ff3b30] text-xs flex items-center gap-1 shadow-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Articles */}
        {activeTab === 'articles' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-[#1d1d1f]">Scientific Articles & Monographs</h3>
                <p className="text-xs text-[#86868b]">Publish research papers across the 7 institutional scientific domains.</p>
              </div>
              <button
                onClick={() => handleOpenArtModal()}
                className="apple-btn-primary text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Publish Article</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((art) => (
                <div key={art.id} className="apple-card p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-mono text-[#0066cc] font-semibold">{art.category}</span>
                    <h4 className="text-base font-semibold text-[#1d1d1f] leading-snug">{art.title}</h4>
                    <p className="text-xs text-[#86868b] line-clamp-3">{art.abstract}</p>
                    <p className="text-[10px] font-mono text-[#86868b]">{art.readTimeMinutes} min read • By {art.author}</p>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-4 border-t border-[rgba(0,0,0,0.06)]">
                    <button
                      onClick={() => handleOpenArtModal(art)}
                      className="p-2 rounded-lg bg-[#ffffff] border border-[#d2d2d7] hover:border-[#0071e3] text-[#1d1d1f] text-xs flex items-center gap-1 shadow-xs"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#0071e3]" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => deleteArticle(art.id)}
                      className="p-2 rounded-lg bg-[#ffffff] border border-[#d2d2d7] hover:border-[#ff3b30] text-[#ff3b30] text-xs flex items-center gap-1 shadow-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Projects */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-[#1d1d1f]">Engineering & Innovation Initiatives</h3>
                <p className="text-xs text-[#86868b]">Track hardware prototypes, lab translations, and technology initiatives.</p>
              </div>
              <button
                onClick={() => handleOpenProjModal()}
                className="apple-btn-primary text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Register Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="apple-card p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-[#86868b]">{proj.category}</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#0071e3]/10 text-[#0066cc] border border-[#0071e3]/20">{proj.status}</span>
                    </div>
                    <h4 className="text-base font-semibold text-[#1d1d1f]">{proj.title}</h4>
                    <p className="text-xs text-[#86868b] line-clamp-3">{proj.description}</p>
                    <p className="text-[10px] font-mono text-[#0066cc]">{proj.founderAttribution}</p>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-4 border-t border-[rgba(0,0,0,0.06)]">
                    <button
                      onClick={() => handleOpenProjModal(proj)}
                      className="p-2 rounded-lg bg-[#ffffff] border border-[#d2d2d7] hover:border-[#0071e3] text-[#1d1d1f] text-xs flex items-center gap-1 shadow-xs"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#0071e3]" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => deleteProject(proj.id)}
                      className="p-2 rounded-lg bg-[#ffffff] border border-[#d2d2d7] hover:border-[#ff3b30] text-[#ff3b30] text-xs flex items-center gap-1 shadow-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Settings */}
        {activeTab === 'settings' && (
          <div className="apple-card p-8 sm:p-10 space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-[#1d1d1f]">Institutional Settings & Pillar Statements</h3>
              <p className="text-xs text-[#86868b]">Control the tagline, three pillars descriptions, and mission declarations.</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateSiteSettings(siteSettings);
                setSaveStatus('Site settings updated successfully!');
                setTimeout(() => setSaveStatus(''), 3000);
              }}
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#515154]">Institutional Tagline</label>
                <input
                  type="text"
                  value={siteSettings.tagline}
                  onChange={(e) => updateSiteSettings({ tagline: e.target.value })}
                  className="apple-input w-full"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#515154]">Supporting Description</label>
                <textarea
                  rows={2}
                  value={siteSettings.supportingDescription}
                  onChange={(e) => updateSiteSettings({ supportingDescription: e.target.value })}
                  className="apple-input w-full resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#515154]">Pillar 1: Science</label>
                  <textarea
                    rows={3}
                    value={siteSettings.threePillars.science}
                    onChange={(e) => updateSiteSettings({
                      threePillars: { ...siteSettings.threePillars, science: e.target.value }
                    })}
                    className="apple-input w-full resize-none text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#515154]">Pillar 2: Innovation</label>
                  <textarea
                    rows={3}
                    value={siteSettings.threePillars.innovation}
                    onChange={(e) => updateSiteSettings({
                      threePillars: { ...siteSettings.threePillars, innovation: e.target.value }
                    })}
                    className="apple-input w-full resize-none text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#515154]">Pillar 3: Entrepreneurship</label>
                  <textarea
                    rows={3}
                    value={siteSettings.threePillars.entrepreneurship}
                    onChange={(e) => updateSiteSettings({
                      threePillars: { ...siteSettings.threePillars, entrepreneurship: e.target.value }
                    })}
                    className="apple-input w-full resize-none text-xs"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button type="submit" className="apple-btn-primary text-xs">
                  <Save className="w-3.5 h-3.5" />
                  <span>Update Institutional Statements</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 6: Messages */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-[#1d1d1f]">Contact Submissions & Inquiries</h3>
              <p className="text-xs text-[#86868b]">All communications submitted via the public contact portal.</p>
            </div>

            {contactMessages.length === 0 ? (
              <div className="apple-card p-12 text-center text-xs text-[#86868b]">
                No contact submissions have been logged yet.
              </div>
            ) : (
              <div className="space-y-4">
                {contactMessages.map((msg) => (
                  <div key={msg.id} className="apple-card p-6 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[rgba(0,0,0,0.06)] pb-3">
                      <div>
                        <span className="text-[10px] uppercase font-mono text-[#0066cc] font-semibold">{msg.category}</span>
                        <h4 className="text-base font-semibold text-[#1d1d1f]">{msg.subject}</h4>
                        <p className="text-xs text-[#86868b]">From: {msg.name} ({msg.email})</p>
                      </div>
                      <span className="text-[11px] font-mono text-[#86868b]">{msg.submittedAt}</span>
                    </div>
                    <p className="text-xs text-[#515154] leading-relaxed whitespace-pre-line">{msg.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Publication Modal */}
      {showPubModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="apple-card-elevated max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-5 relative">
            <button
              onClick={() => setShowPubModal(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f]"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-xl font-semibold text-[#1d1d1f]">
              {editingPubId ? 'Edit Publication' : 'Add Scholarly Publication'}
            </h3>
            <form onSubmit={handleSavePublication} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-mono text-[#515154]">Book Title *</label>
                <input
                  type="text"
                  required
                  value={pubForm.title}
                  onChange={(e) => setPubForm({ ...pubForm, title: e.target.value })}
                  className="apple-input w-full"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-mono text-[#515154]">Subtitle (Optional)</label>
                <input
                  type="text"
                  value={pubForm.subtitle}
                  onChange={(e) => setPubForm({ ...pubForm, subtitle: e.target.value })}
                  className="apple-input w-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#515154]">Author *</label>
                  <input
                    type="text"
                    required
                    value={pubForm.author}
                    onChange={(e) => setPubForm({ ...pubForm, author: e.target.value })}
                    className="apple-input w-full"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#515154]">Year *</label>
                  <input
                    type="text"
                    required
                    value={pubForm.publicationDate}
                    onChange={(e) => setPubForm({ ...pubForm, publicationDate: e.target.value })}
                    className="apple-input w-full"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-mono text-[#515154]">Amazon Purchase URL</label>
                <input
                  type="text"
                  value={pubForm.amazonPurchaseUrl}
                  onChange={(e) => setPubForm({ ...pubForm, amazonPurchaseUrl: e.target.value })}
                  placeholder="https://www.amazon.in/dp/..."
                  className="apple-input w-full"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-mono text-[#515154]">Book Cover Image URL (Leave blank for Apple placeholder)</label>
                <input
                  type="text"
                  value={pubForm.coverImageUrl}
                  onChange={(e) => setPubForm({ ...pubForm, coverImageUrl: e.target.value })}
                  placeholder="https://..."
                  className="apple-input w-full"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-mono text-[#515154]">Synopsis / Description *</label>
                <textarea
                  rows={3}
                  required
                  value={pubForm.description}
                  onChange={(e) => setPubForm({ ...pubForm, description: e.target.value })}
                  className="apple-input w-full resize-none"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPubModal(false)}
                  className="apple-btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="apple-btn-primary text-xs"
                >
                  Save Publication
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Article Modal */}
      {showArtModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="apple-card-elevated max-w-xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-5 relative">
            <button
              onClick={() => setShowArtModal(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f]"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-xl font-semibold text-[#1d1d1f]">
              {editingArtId ? 'Edit Scientific Article' : 'Publish Scientific Article'}
            </h3>
            <form onSubmit={handleSaveArticle} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-mono text-[#515154]">Title *</label>
                <input
                  type="text"
                  required
                  value={artForm.title}
                  onChange={(e) => setArtForm({ ...artForm, title: e.target.value })}
                  className="apple-input w-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#515154]">Category *</label>
                  <select
                    value={artForm.category}
                    onChange={(e: any) => setArtForm({ ...artForm, category: e.target.value })}
                    className="apple-input w-full bg-[#ffffff]"
                  >
                    <option value="Quantum Physics">Quantum Physics</option>
                    <option value="Nuclear Science">Nuclear Science</option>
                    <option value="Nanotechnology">Nanotechnology</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Physics">Physics</option>
                    <option value="Scientific Research">Scientific Research</option>
                    <option value="Emerging Technologies">Emerging Technologies</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#515154]">Read Time (Mins)</label>
                  <input
                    type="number"
                    value={artForm.readTimeMinutes}
                    onChange={(e) => setArtForm({ ...artForm, readTimeMinutes: Number(e.target.value) })}
                    className="apple-input w-full"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-mono text-[#515154]">Abstract / Executive Summary *</label>
                <textarea
                  rows={2}
                  required
                  value={artForm.abstract}
                  onChange={(e) => setArtForm({ ...artForm, abstract: e.target.value })}
                  className="apple-input w-full resize-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-mono text-[#515154]">Article Body (Full Monograph) *</label>
                <textarea
                  rows={6}
                  required
                  value={artForm.content}
                  onChange={(e) => setArtForm({ ...artForm, content: e.target.value })}
                  className="apple-input w-full resize-none font-mono text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-mono text-[#515154]">Tags (Comma separated)</label>
                <input
                  type="text"
                  value={artForm.tags}
                  onChange={(e) => setArtForm({ ...artForm, tags: e.target.value })}
                  placeholder="Physics, Quantum, Theory"
                  className="apple-input w-full"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowArtModal(false)}
                  className="apple-btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="apple-btn-primary text-xs"
                >
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Project Modal */}
      {showProjModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="apple-card-elevated max-w-xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-5 relative">
            <button
              onClick={() => setShowProjModal(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f]"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-xl font-semibold text-[#1d1d1f]">
              {editingProjId ? 'Edit Innovation Project' : 'Register Innovation Project'}
            </h3>
            <form onSubmit={handleSaveProject} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-mono text-[#515154]">Project Title *</label>
                <input
                  type="text"
                  required
                  value={projForm.title}
                  onChange={(e) => setProjForm({ ...projForm, title: e.target.value })}
                  className="apple-input w-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#515154]">Category</label>
                  <input
                    type="text"
                    required
                    value={projForm.category}
                    onChange={(e) => setProjForm({ ...projForm, category: e.target.value })}
                    className="apple-input w-full"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#515154]">Status</label>
                  <select
                    value={projForm.status}
                    onChange={(e: any) => setProjForm({ ...projForm, status: e.target.value })}
                    className="apple-input w-full bg-[#ffffff]"
                  >
                    <option value="Active">Active</option>
                    <option value="Prototype">Prototype</option>
                    <option value="Research">Research</option>
                    <option value="Concept">Concept</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-mono text-[#515154]">Founder Attribution</label>
                <input
                  type="text"
                  required
                  value={projForm.founderAttribution}
                  onChange={(e) => setProjForm({ ...projForm, founderAttribution: e.target.value })}
                  className="apple-input w-full"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-mono text-[#515154]">Project Description *</label>
                <textarea
                  rows={2}
                  required
                  value={projForm.description}
                  onChange={(e) => setProjForm({ ...projForm, description: e.target.value })}
                  className="apple-input w-full resize-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-mono text-[#515154]">Technical Details & Architecture *</label>
                <textarea
                  rows={4}
                  required
                  value={projForm.technicalDetails}
                  onChange={(e) => setProjForm({ ...projForm, technicalDetails: e.target.value })}
                  className="apple-input w-full resize-none font-mono text-xs"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowProjModal(false)}
                  className="apple-btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="apple-btn-primary text-xs"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
