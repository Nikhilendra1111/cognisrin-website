import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  TrendingUp, 
  Building2, 
  GraduationCap, 
  Lightbulb, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { SEOHead } from '../components/common/SEOHead';
import { LectureMilestoneBadge } from '../components/common/LectureMilestoneBadge';

export const Entrepreneurship: React.FC = () => {
  const { founderProfile } = useContent();

  const frameworks = [
    {
      title: "First-Principles Entrepreneurial Philosophy",
      icon: Lightbulb,
      description: "Rejecting analogy-based business copycats in favor of fundamental economic reality, thermodynamic limits, and verifiable technological advantages."
    },
    {
      title: "Deep-Technology Startup Initiatives",
      icon: TrendingUp,
      description: "Structuring capital pathways, physical testing methodologies, and defensive IP protection for capital-intensive hardware and chemical ventures."
    },
    {
      title: "Sustainable Business Innovation",
      icon: Building2,
      description: "Architecting resilient balance sheets, positive unit economics, and operational rigor rather than relying on hyper-dilutive speculative capital."
    },
    {
      title: "Venture Translation & IP Licensing",
      icon: Briefcase,
      description: "Translating laboratory discoveries from Technology Readiness Level (TRL) 3 to enterprise readiness (TRL 7+) through structured licensing."
    },
    {
      title: "Entrepreneurial Education & Masterclasses",
      icon: GraduationCap,
      description: "Democratizing rigorous venture thinking across India through nationwide lectures, symposiums, and masterclasses led by Nikhilendra Srinivas."
    }
  ];

  return (
    <div className="bg-[#ffffff] text-[#1d1d1f] space-y-20 pb-24">
      <SEOHead
        title="Entrepreneurship & Technology Venture Directorate"
        description="Explore substantive entrepreneurial philosophy, deep-tech startup frameworks, and business innovation paradigms at Cognisrin."
        canonicalPath="/entrepreneurship"
      />

      {/* Header */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 text-center border-b border-[rgba(0,0,0,0.08)]">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5f5f7] border border-[#d2d2d7] text-xs font-mono text-[#0066cc]">
            <span>DISCIPLINED VENTURE CREATION</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-semibold text-[#1d1d1f] tracking-tight font-mono">
            Entrepreneurship & Venture Frameworks
          </h1>
          <p className="text-lg text-[#86868b] max-w-2xl mx-auto leading-relaxed">
            Bridging fundamental scientific inquiry with resilient institutional enterprise. Fostering generation-defining builders through first-principles execution.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-2xl sm:text-4xl font-semibold text-[#1d1d1f] tracking-tight">
            Not Merely Promotional. Substantive & Rigorous.
          </h2>
          <p className="text-[#515154] text-sm sm:text-base leading-relaxed">
            At Cognisrin, entrepreneurship is not treated as a collection of marketing buzzwords or generic startup pitch decks. Guided by Founder Nikhilendra Srinivas—author of <em>The Entrepreneur Genesis</em>—we treat venture building as a rigorous discipline requiring empirical validation, engineering truth, and institutional governance.
          </p>
        </div>

        {/* Frameworks Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {frameworks.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="apple-card p-8 sm:p-10 space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#ffffff] border border-[#d2d2d7] shadow-xs flex items-center justify-center text-[#0071e3]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1d1d1f] tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#86868b] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-[rgba(0,0,0,0.06)]">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#0066cc] font-semibold">
                    Core Institutional Methodology
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lecture Milestone Section */}
        <LectureMilestoneBadge
          lecturesCount={founderProfile.lecturesCount}
          milestoneText={founderProfile.lecturesMilestoneText}
        />

        {/* Book Callout: The Entrepreneur Genesis */}
        <div className="apple-card p-8 sm:p-12 border border-[#d2d2d7] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#0066cc] font-semibold">
              ESSENTIAL READING
            </span>
            <h3 className="text-2xl sm:text-3xl font-semibold text-[#1d1d1f] tracking-tight">
              The Entrepreneur Genesis
            </h3>
            <p className="text-xs text-[#86868b] leading-relaxed">
              Authored by Nikhilendra Srinivas. A foundational blueprint for aspiring founders, scientists, and technology innovators seeking to transform conceptual breakthroughs into scalable, enduring institutions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a
              href="https://www.amazon.in/Entrepreneur-Genesis-Nikhilendra-srinivas-ebook/dp/B0DV8X9X23/ref=sr_1_2?crid=2YBKIXZFEKYBQ&dib=eyJ2IjoiMSJ9.QUCP4AsY-08SNTk6gQQjZMTyN5dkUxdQklmxoNAVUrc.cM18YsBsji1Di8mlz-7rFAZlChg2dBsAToIselcBHX4&dib_tag=se&keywords=Nikhilendra+srinivas&qid=1794121248&sprefix=nikhilendra+sriniva%2Caps%2C272&sr=8-2"
              target="_blank"
              rel="noopener noreferrer"
              className="apple-btn-primary px-6 py-3 text-xs font-medium inline-flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Purchase on Amazon</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <Link
              to="/publications"
              className="apple-btn-secondary px-5 py-3 text-xs font-medium"
            >
              <span>All Publications</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </section>
    </div>
  );
};
