import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Atom, 
  Lightbulb, 
  Briefcase, 
  ArrowRight, 
  ChevronRight,
  ExternalLink,
  BookOpen,
  ShoppingBag
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { SEOHead } from '../components/common/SEOHead';
import { FounderPhotoPlaceholder } from '../components/common/FounderPhotoPlaceholder';
import { BookCoverPlaceholder } from '../components/common/BookCoverPlaceholder';
import { LectureMilestoneBadge } from '../components/common/LectureMilestoneBadge';

export const Home: React.FC = () => {
  const { founderProfile, siteSettings, publications, projects } = useContent();

  const featuredProjects = projects.slice(0, 3);
  const featuredBooks = publications.slice(0, 2);

  return (
    <div className="bg-[#ffffff] text-[#1d1d1f] space-y-28 pb-24">
      <SEOHead
        title="Official Organisation Website"
        description="Cognisrin is an independent organisation founded and pioneered by Nikhilendra Srinivas, dedicated to encouraging scientific exploration, technological innovation, and entrepreneurial thinking."
        canonicalPath="/"
      />

      {/* APPLE LIGHT HERO SECTION (#ffffff / #1d1d1f / #86868b / #0071e3) */}
      <section className="relative min-h-[82vh] flex items-center justify-center pt-20 pb-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative z-10 max-w-5xl mx-auto space-y-8">
          
          {/* BIG PROMINENT ORGANISATION LOGO ON SITE LOAD */}
          <div className="flex flex-col items-center justify-center gap-4 pt-2">
            <div className="relative group">
              <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full bg-gradient-to-b from-white to-[#f5f5f7] p-2.5 border-2 border-[#d2d2d7] shadow-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-105 group-hover:shadow-3xl">
                <img
                  src="/images/cognisrin-logo.png"
                  alt="COGNISRIN Official Organisation Emblem"
                  className="w-full h-full rounded-full object-contain"
                  loading="eager"
                />
              </div>
            </div>

            {/* Apple Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f5f5f7] border border-[#d2d2d7] text-xs font-normal text-[#1d1d1f]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3] animate-ping" />
              <span>FOUNDED & PIONEERED BY NIKHILENDRA SRINIVAS</span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-semibold text-[#1d1d1f] tracking-tighter leading-none font-mono">
              COGNISRIN
            </h1>
            <p className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-[#424245] max-w-4xl mx-auto leading-tight">
              "{siteSettings.tagline}"
            </p>
          </div>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#86868b] max-w-2xl mx-auto leading-relaxed">
            {siteSettings.supportingDescription}
          </p>

          {/* Apple Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <Link
              to="/science"
              className="apple-btn-primary"
            >
              <span>Explore Our Work</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/auth/register"
              className="apple-btn-secondary"
            >
              <span>Join Cognisrin</span>
              <ChevronRight className="w-4 h-4 text-[#86868b]" />
            </Link>
          </div>

          {/* Apple Metrics Bar */}
          <div className="pt-14 border-t border-[rgba(0,0,0,0.08)] max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-semibold text-[#1d1d1f] tracking-tight font-mono">{founderProfile.lecturesCount}+</p>
              <p className="text-[11px] text-[#86868b] mt-1 uppercase tracking-wider font-medium">Lectures Across India</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-[#0071e3] tracking-tight font-mono">7</p>
              <p className="text-[11px] text-[#86868b] mt-1 uppercase tracking-wider font-medium">Scientific Domains</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-[#1d1d1f] tracking-tight font-mono">2</p>
              <p className="text-[11px] text-[#86868b] mt-1 uppercase tracking-wider font-medium">Notable Books</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-[#28a745] tracking-tight font-mono">100%</p>
              <p className="text-[11px] text-[#86868b] mt-1 uppercase tracking-wider font-medium">Independent</p>
            </div>
          </div>

        </div>
      </section>

      {/* CORE PILLARS: APPLE LIGHT PRODUCT CARDS (#f5f5f7) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs uppercase font-mono tracking-widest text-[#0066cc] font-semibold">
            INSTITUTIONAL FOUNDATIONS
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold text-[#1d1d1f] tracking-tight">
            The Three Core Pillars of Cognisrin
          </h2>
          <p className="text-[#86868b] max-w-xl mx-auto text-sm sm:text-base">
            Conceived by Founder Nikhilendra Srinivas to foster a self-reinforcing continuum between pure knowledge, practical invention, and institutional venture building.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Pillar 1 */}
          <div className="apple-card p-8 sm:p-10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-2xl bg-[#ffffff] border border-[rgba(0,0,0,0.08)] shadow-sm flex items-center justify-center text-[#0071e3]">
                <Atom className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-semibold text-[#1d1d1f] tracking-tight">Science</h3>
              <p className="text-sm text-[#86868b] leading-relaxed">
                {siteSettings.threePillars.science}
              </p>
            </div>
            <div className="pt-8 mt-6 border-t border-[rgba(0,0,0,0.06)]">
              <Link to="/science" className="apple-link font-medium">
                <span>Explore 7 Scientific Tracks</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="apple-card p-8 sm:p-10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-2xl bg-[#ffffff] border border-[rgba(0,0,0,0.08)] shadow-sm flex items-center justify-center text-[#0071e3]">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-semibold text-[#1d1d1f] tracking-tight">Innovation</h3>
              <p className="text-sm text-[#86868b] leading-relaxed">
                {siteSettings.threePillars.innovation}
              </p>
            </div>
            <div className="pt-8 mt-6 border-t border-[rgba(0,0,0,0.06)]">
              <Link to="/innovations" className="apple-link font-medium">
                <span>View Engineering Projects</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="apple-card p-8 sm:p-10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-2xl bg-[#ffffff] border border-[rgba(0,0,0,0.08)] shadow-sm flex items-center justify-center text-[#0071e3]">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-semibold text-[#1d1d1f] tracking-tight">Entrepreneurship</h3>
              <p className="text-sm text-[#86868b] leading-relaxed">
                {siteSettings.threePillars.entrepreneurship}
              </p>
            </div>
            <div className="pt-8 mt-6 border-t border-[rgba(0,0,0,0.06)]">
              <Link to="/entrepreneurship" className="apple-link font-medium">
                <span>Study Venture Frameworks</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 600+ LECTURES ACHIEVEMENT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LectureMilestoneBadge
          lecturesCount={founderProfile.lecturesCount}
          milestoneText={founderProfile.lecturesMilestoneText}
        />
      </section>

      {/* EXECUTIVE SPOTLIGHT: NIKHILENDRA SRINIVAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="apple-card p-8 sm:p-14 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 flex justify-center">
              <FounderPhotoPlaceholder
                photoUrl={founderProfile.photoUrl}
                fullName={founderProfile.fullName}
                designation={founderProfile.designation}
                size="lg"
              />
            </div>

            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="space-y-2">
                <span className="text-xs uppercase font-mono tracking-widest text-[#0066cc] font-semibold">
                  LEADERSHIP & PHILOSOPHY
                </span>
                <h2 className="text-3xl sm:text-5xl font-semibold text-[#1d1d1f] tracking-tight">
                  {founderProfile.fullName}
                </h2>
                <p className="text-base font-normal text-[#0066cc]">
                  {founderProfile.designation}
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 pt-1">
                  {founderProfile.professionalIdentities.map((identity) => (
                    <span
                      key={identity}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-[#ffffff] text-[#1d1d1f] border border-[#d2d2d7]"
                    >
                      {identity}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-[#86868b] text-sm sm:text-base leading-relaxed">
                {founderProfile.biographySummary}
              </p>

              <blockquote className="border-l-2 border-[#0071e3] pl-4 py-1 italic text-sm text-[#1d1d1f] bg-[#ffffff] rounded-r-lg border-y border-r border-[#d2d2d7] p-3">
                "{founderProfile.visionAndPhilosophy}"
              </blockquote>

              <div className="pt-2 flex flex-wrap justify-center lg:justify-start gap-3">
                <Link
                  to="/founder/nikhilendra-srinivas"
                  className="apple-btn-primary"
                >
                  <span>Read Complete Biography</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/publications"
                  className="apple-btn-secondary"
                >
                  <BookOpen className="w-4 h-4 text-[#0071e3]" />
                  <span>View Published Works</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURED INNOVATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-[#0066cc] font-semibold">
              ENGINEERING & APPLIED SCIENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1d1d1f] tracking-tight mt-1">
              Featured Innovations & Research
            </h2>
          </div>
          <Link
            to="/innovations"
            className="apple-link font-medium"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="apple-card p-7 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#86868b]">{project.category}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ffffff] text-[#0066cc] border border-[#d2d2d7] text-[10px]">
                    {project.status}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[#1d1d1f] tracking-tight">
                  {project.title}
                </h3>
                <p className="text-xs text-[#86868b] line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[rgba(0,0,0,0.06)] text-[11px] text-[#86868b]">
                <p className="italic text-[#0066cc]">{project.founderAttribution}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PUBLICATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-14">
          <span className="text-xs uppercase font-mono tracking-widest text-[#0066cc] font-semibold">
            NOTABLE WORKS & MONOGRAPHS
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#1d1d1f] tracking-tight">
            Publications by Nikhilendra Srinivas
          </h2>
          <p className="text-[#86868b] max-w-xl mx-auto text-sm">
            Works examining the convergence between fundamental physical dynamics and entrepreneurial venture architectures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {featuredBooks.map((book) => (
            <div
              key={book.id}
              className="apple-card p-8 flex flex-col items-center text-center space-y-6"
            >
              <BookCoverPlaceholder publication={book} />
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-mono text-[#0066cc] tracking-widest">
                  Author: {book.author}
                </span>
                <h3 className="text-xl font-semibold text-[#1d1d1f] tracking-tight">{book.title}</h3>
                <p className="text-xs text-[#86868b] line-clamp-3 leading-relaxed">
                  {book.description}
                </p>
              </div>

              <div className="w-full pt-4 border-t border-[rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-center justify-between gap-3">
                <Link
                  to="/publications"
                  className="apple-link font-medium text-xs"
                >
                  <span>Book Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                {book.amazonPurchaseUrl && (
                  <a
                    href={book.amazonPurchaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="apple-btn-primary px-4 py-2 text-xs font-medium inline-flex items-center gap-1.5 w-full sm:w-auto justify-center"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Purchase on Amazon</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* JOIN CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="apple-card p-10 sm:p-16 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <span className="text-xs uppercase font-mono tracking-widest text-[#0066cc] font-semibold">
              JOIN OUR INDEPENDENT NETWORK
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold text-[#1d1d1f] tracking-tight">
              Advance Science. Pioneer Innovation.
            </h2>
            <p className="text-[#86868b] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Connect with fellow researchers, access upcoming lecture schedules by Nikhilendra Srinivas, review experimental project briefs, and participate in Cognisrin's long-term institutional mission.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                to="/auth/register"
                className="apple-btn-primary"
              >
                Create Member Account
              </Link>
              <Link
                to="/contact"
                className="apple-btn-secondary"
              >
                Submit Collaboration Inquiry
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
