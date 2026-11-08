import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck,
  ChevronRight,
  Atom,
  Briefcase,
  BookOpen
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { SEOHead } from '../components/common/SEOHead';
import { FounderPhotoPlaceholder } from '../components/common/FounderPhotoPlaceholder';
import { LectureMilestoneBadge } from '../components/common/LectureMilestoneBadge';
import { BookCoverPlaceholder } from '../components/common/BookCoverPlaceholder';

export const Founder: React.FC = () => {
  const { founderProfile, publications } = useContent();

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": founderProfile.fullName,
    "jobTitle": founderProfile.designation,
    "description": "Founder and Pioneer of Cognisrin, Author, Entrepreneur, and Science Enthusiast with 600+ lectures delivered across India.",
    "url": "https://cognisrin.in/founder/nikhilendra-srinivas",
    "worksFor": {
      "@type": "Organization",
      "name": "Cognisrin",
      "url": "https://cognisrin.in"
    },
    "knowsAbout": founderProfile.scientificInterests.concat(founderProfile.entrepreneurialInterests)
  };

  return (
    <div className="bg-[#ffffff] text-[#1d1d1f] space-y-24 pb-24">
      <SEOHead
        title={`${founderProfile.fullName} — Founder and Pioneer of Cognisrin`}
        description={`Comprehensive official biography of ${founderProfile.fullName}, Founder and Pioneer of Cognisrin, Author, Entrepreneur, and Science Enthusiast with 600+ lectures delivered across India.`}
        canonicalPath="/founder/nikhilendra-srinivas"
        customSchema={personSchema}
      />

      {/* Header */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 text-center border-b border-[rgba(0,0,0,0.08)]">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5f5f7] border border-[#d2d2d7] text-xs font-mono text-[#0066cc]">
            <span>OFFICIAL FOUNDER BIOGRAPHY</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-semibold text-[#1d1d1f] tracking-tight font-mono">
            {founderProfile.fullName}
          </h1>
          <p className="text-xl text-[#0066cc] font-medium tracking-tight">
            {founderProfile.designation}
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {founderProfile.professionalIdentities.map((id) => (
              <span key={id} className="px-3 py-1 rounded-full text-xs font-mono bg-[#f5f5f7] text-[#515154] border border-[#d2d2d7]">
                {id}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main Profile Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Portrait Column */}
          <div className="lg:col-span-5 flex flex-col items-center space-y-6">
            <FounderPhotoPlaceholder
              photoUrl={founderProfile.photoUrl}
              fullName={founderProfile.fullName}
              designation={founderProfile.designation}
              size="hero"
            />

            <div className="w-full apple-card p-6 space-y-3">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#0066cc] font-semibold">
                Official Recognition
              </span>
              <p className="text-xs text-[#515154] leading-relaxed">
                Pioneer of Cognisrin and leading advocate for deep-tech translation, scientific education, and high-impact enterprise across the Indian subcontinent.
              </p>
            </div>
          </div>

          {/* Biography Content Column */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Executive Summary */}
            <div className="space-y-3">
              <span className="text-xs uppercase font-mono tracking-widest text-[#0066cc] font-semibold">
                EXECUTIVE SUMMARY
              </span>
              <p className="text-lg sm:text-xl text-[#1d1d1f] leading-relaxed font-normal">
                {founderProfile.biographySummary}
              </p>
            </div>

            {/* Detailed Narrative */}
            <div className="space-y-4 text-[#515154] leading-relaxed text-sm sm:text-base border-t border-[rgba(0,0,0,0.08)] pt-6 whitespace-pre-line">
              {founderProfile.fullBiography}
            </div>

            {/* Educational Background & Journey */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="apple-card p-6 space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#0066cc] font-semibold">
                  Academic Disciplines
                </span>
                <p className="text-xs text-[#515154] leading-relaxed">
                  {founderProfile.educationalBackground}
                </p>
              </div>

              <div className="apple-card p-6 space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#0066cc] font-semibold">
                  Institutional Mission
                </span>
                <p className="text-xs text-[#515154] leading-relaxed">
                  {founderProfile.visionAndPhilosophy}
                </p>
              </div>
            </div>

            {/* Scientific & Entrepreneurial Interests */}
            <div className="space-y-4 pt-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#1d1d1f] font-mono">
                Core Domains of Focus
              </h4>
              <div className="flex flex-wrap gap-2">
                {founderProfile.scientificInterests.map((interest) => (
                  <span key={interest} className="px-3 py-1 rounded-full text-xs bg-[#f5f5f7] text-[#1d1d1f] border border-[#d2d2d7]">
                    {interest}
                  </span>
                ))}
                {founderProfile.entrepreneurialInterests.map((interest) => (
                  <span key={interest} className="px-3 py-1 rounded-full text-xs bg-[#0071e3]/10 text-[#0066cc] border border-[#0071e3]/30">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Milestone Banner: 600+ Lectures */}
        <LectureMilestoneBadge
          lecturesCount={founderProfile.lecturesCount}
          milestoneText={founderProfile.lecturesMilestoneText}
        />

        {/* Authored Books Section */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase font-mono tracking-widest text-[#0066cc] font-semibold">
              SCHOLARLY OUTPUT
            </span>
            <h2 className="text-3xl font-semibold text-[#1d1d1f] tracking-tight">
              Authored Books by {founderProfile.fullName}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {publications.map((book) => (
              <div key={book.id} className="apple-card p-8 flex flex-col sm:flex-row items-center gap-6">
                <div className="flex-shrink-0 w-36">
                  <BookCoverPlaceholder publication={book} />
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <span className="text-[10px] font-mono uppercase text-[#0066cc] font-semibold">{book.category}</span>
                  <h4 className="text-lg font-semibold text-[#1d1d1f]">{book.title}</h4>
                  <p className="text-xs text-[#86868b] line-clamp-3">{book.description}</p>
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <Link to="/publications" className="apple-link text-xs">
                      View Book Details <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                    {book.amazonPurchaseUrl && (
                      <a
                        href={book.amazonPurchaseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="apple-btn-primary px-3 py-1.5 text-xs font-medium inline-flex items-center gap-1"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Amazon</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
};
