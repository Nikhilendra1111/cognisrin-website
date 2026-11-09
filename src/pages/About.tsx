import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Compass, 
  ChevronRight,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Atom,
  Lightbulb,
  Briefcase
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { SEOHead } from '../components/common/SEOHead';
import { LectureMilestoneBadge } from '../components/common/LectureMilestoneBadge';

export const About: React.FC = () => {
  const { founderProfile, siteSettings } = useContent();

  return (
    <div className="bg-[#ffffff] text-[#1d1d1f] space-y-24 pb-24">
      <SEOHead
        title="About Cognisrin — Mission, Vision & Founding Philosophy"
        description="Learn about Cognisrin, an independent organisation founded and pioneered by Nikhilendra Srinivas, dedicated to advancing Science, Innovation, and Entrepreneurship."
        canonicalPath="/about"
      />

      {/* Header */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 text-center border-b border-[rgba(0,0,0,0.08)]">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5f5f7] border border-[#d2d2d7] text-xs font-mono text-[#0066cc]">
            <span>INSTITUTIONAL IDENTITY</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-semibold text-[#1d1d1f] tracking-tight font-mono">
            About COGNISRIN
          </h1>
          <p className="text-lg text-[#86868b] max-w-2xl mx-auto leading-relaxed">
            Founded and Pioneered by Nikhilendra Srinivas to encourage scientific exploration, cultivate engineering innovation, and foster disciplined entrepreneurial execution.
          </p>
        </div>
      </section>

      {/* Main Narrative & Bento Boxes */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Origin */}
        <div className="space-y-6">
          <span className="text-xs uppercase font-mono tracking-widest text-[#0066cc] font-semibold">
            ORIGIN & PURPOSE
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#1d1d1f] tracking-tight">
            Why Cognisrin Was Established
          </h2>
          <div className="text-[#515154] space-y-4 leading-relaxed text-base sm:text-lg">
            <p>
              Cognisrin was established as an autonomous, independent organisation designed to dismantle the artificial barriers separating scientific inquiry, engineering invention, and enterprise creation. Too often, scientific discovery remains cloistered within academic silos, engineering prototypes lack disciplined commercial translation, and startups neglect the rigorous first-principles foundations of physical science.
            </p>
            <p>
              Under the visionary leadership of Founder and Pioneer <strong>Nikhilendra Srinivas</strong>, Cognisrin was conceived to serve as a beacon for rigorous intellectual ambition. Having conducted over <strong>600 keynote lectures across India</strong>, Nikhilendra identified the vital need for an institution that empowers thinkers to explore fundamental physics, chemistry, and nanotechnology while concurrently equipping them with practical venture methodologies.
            </p>
          </div>
        </div>

        {/* Mission & Vision Bento Cards */}
        <div id="mission" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="apple-card p-8 sm:p-10 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-[#ffffff] border border-[#d2d2d7] shadow-xs flex items-center justify-center text-[#0071e3]">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-semibold text-[#1d1d1f] tracking-tight">Our Mission</h3>
            <p className="text-sm text-[#86868b] leading-relaxed">
              {siteSettings.missionStatement}
            </p>
          </div>

          <div className="apple-card p-8 sm:p-10 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-[#ffffff] border border-[#d2d2d7] shadow-xs flex items-center justify-center text-[#0071e3]">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-semibold text-[#1d1d1f] tracking-tight">Our Vision</h3>
            <p className="text-sm text-[#86868b] leading-relaxed">
              {siteSettings.visionStatement}
            </p>
          </div>
        </div>

        {/* Founding Philosophy */}
        <div className="apple-card p-8 sm:p-12 space-y-4 bg-gradient-to-br from-[#f5f5f7] via-[#ffffff] to-[#f5f5f7] border border-[#d2d2d7]">
          <span className="text-xs uppercase font-mono tracking-widest text-[#0066cc] font-semibold">
            THE FOUNDING PHILOSOPHY
          </span>
          <p className="text-lg sm:text-xl text-[#1d1d1f] leading-relaxed font-normal italic">
            "{siteSettings.foundingPhilosophy}"
          </p>
          <p className="text-xs font-mono text-[#86868b] pt-2">
            Attributed to Nikhilendra Srinivas, Founder and Pioneer of Cognisrin
          </p>
        </div>

        {/* Long-Term Ambitions Bento */}
        <div className="space-y-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1d1d1f] tracking-tight">
            Our Long-Term Ambitions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="apple-card p-7 space-y-2">
              <h4 className="text-base font-semibold text-[#1d1d1f]">1. Nationwide Scientific Literacy & Exploration</h4>
              <p className="text-xs text-[#86868b] leading-relaxed">
                Expanding upon the 600+ lecture milestone delivered by Nikhilendra Srinivas with structured academic seminars, open research repositories, and youth science symposia.
              </p>
            </div>
            <div className="apple-card p-7 space-y-2">
              <h4 className="text-base font-semibold text-[#1d1d1f]">2. Deep-Tech Translation & Hardware Incubation</h4>
              <p className="text-xs text-[#86868b] leading-relaxed">
                Facilitating experimental laboratories and IP frameworks to translate laboratory discoveries into commercial prototypes across clean energy, quantum sensors, and nanostructures.
              </p>
            </div>
            <div className="apple-card p-7 space-y-2">
              <h4 className="text-base font-semibold text-[#1d1d1f]">3. Multi-Disciplinary Monograph Publishing</h4>
              <p className="text-xs text-[#86868b] leading-relaxed">
                Publishing foundational texts—following *The Entrepreneur Genesis* and *The Power Within – Quantum*—to document breakthroughs in physics, enterprise, and philosophy.
              </p>
            </div>
            <div className="apple-card p-7 space-y-2">
              <h4 className="text-base font-semibold text-[#1d1d1f]">4. Independent Scientific Directorate</h4>
              <p className="text-xs text-[#86868b] leading-relaxed">
                Maintaining strict independence from fleeting commercial trends to champion enduring, high-conviction research with generational horizons.
              </p>
            </div>
          </div>
        </div>

        {/* Founder Attribution Callout */}
        <div className="apple-card p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#d2d2d7]">
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-[10px] uppercase font-mono text-[#0066cc] font-semibold">Leadership</p>
            <h4 className="text-xl font-semibold text-[#1d1d1f]">{founderProfile.fullName}</h4>
            <p className="text-xs text-[#86868b]">{founderProfile.designation} • {founderProfile.lecturesMilestoneText}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 text-[11px] font-mono">
              <a
                href="https://www.amazon.com/author/nikhilendrasrinivas"
                target="_blank"
                rel="me noopener"
                className="text-[#0066cc] hover:underline flex items-center gap-1 font-medium bg-[#ffffff] px-2.5 py-0.5 rounded-full border border-[#d2d2d7]"
              >
                <span>Amazon Author</span>
                <ArrowUpRight className="w-3 h-3 text-[#0066cc]" />
              </a>
              <a
                href="https://www.linkedin.com/in/nikhilendra-srinivas-b7a61528a"
                target="_blank"
                rel="me noopener"
                className="text-[#0066cc] hover:underline flex items-center gap-1 font-medium bg-[#ffffff] px-2.5 py-0.5 rounded-full border border-[#d2d2d7]"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-[#0066cc]" />
              </a>
            </div>
          </div>
          <Link
            to="/founder/nikhilendra-srinivas"
            className="apple-btn-primary px-6 py-2.5 text-xs font-medium flex-shrink-0"
          >
            <span>View Founder Profile</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </section>
    </div>
  );
};
