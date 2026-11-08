import React from 'react';
import { Link } from 'react-router-dom';
import { Atom, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

export const Footer: React.FC = () => {
  const { founderProfile } = useContent();

  return (
    <footer className="bg-[#f5f5f7] border-t border-[#d2d2d7] text-[#86868b] text-xs">
      
      {/* Top Attribution Banner */}
      <div className="border-b border-[#d2d2d7] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <img
              src="/images/founder-avatar.jpg"
              alt={founderProfile.fullName}
              className="w-12 h-12 rounded-full border border-[#d2d2d7] object-cover shadow-sm"
            />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#0066cc] font-semibold">
                Pioneering Leadership
              </p>
              <h4 className="text-base font-semibold text-[#1d1d1f] tracking-tight">
                Founded and Pioneered by {founderProfile.fullName}
              </h4>
              <p className="text-xs text-[#86868b] mt-0.5">
                Author, Entrepreneur and Science Enthusiast • {founderProfile.lecturesMilestoneText}
              </p>
            </div>
          </div>

          <Link
            to="/founder/nikhilendra-srinivas"
            className="apple-btn-secondary px-5 py-2 text-xs"
          >
            <span>Executive Biography & Works</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#0066cc]" />
          </Link>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#ffffff] border border-[#d2d2d7] flex items-center justify-center">
                <Atom className="w-3.5 h-3.5 text-[#0071e3]" />
              </div>
              <span className="text-sm font-semibold tracking-tight text-[#1d1d1f] font-mono">
                COGNISRIN
              </span>
            </div>
            <p className="text-[#86868b] text-xs leading-relaxed max-w-sm">
              An independent organisation dedicated to encouraging scientific exploration, technological innovation, and entrepreneurial thinking.
            </p>
            <div className="pt-2 text-[#6e6e73] space-y-1 text-[11px] font-mono">
              <p>Official Domain: <span className="text-[#1d1d1f]">cognisrin.in</span></p>
              <p>Communications: <span className="text-[#1d1d1f]">contact@cognisrin.in</span></p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-[11px] uppercase tracking-wider text-[#1d1d1f] font-semibold">
              Core Pillars
            </h4>
            <ul className="space-y-2 text-[#6e6e73]">
              <li><Link to="/science" className="hover:text-[#1d1d1f] transition-colors">Science & Exploration</Link></li>
              <li><Link to="/innovations" className="hover:text-[#1d1d1f] transition-colors">Innovations & Projects</Link></li>
              <li><Link to="/entrepreneurship" className="hover:text-[#1d1d1f] transition-colors">Entrepreneurship</Link></li>
              <li><Link to="/about" className="hover:text-[#1d1d1f] transition-colors">About Cognisrin</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-[11px] uppercase tracking-wider text-[#1d1d1f] font-semibold">
              Works & Archive
            </h4>
            <ul className="space-y-2 text-[#6e6e73]">
              <li><Link to="/publications" className="hover:text-[#1d1d1f] transition-colors">The Entrepreneur Genesis</Link></li>
              <li><Link to="/publications" className="hover:text-[#1d1d1f] transition-colors">The Power Within – Quantum</Link></li>
              <li><Link to="/publications" className="hover:text-[#1d1d1f] transition-colors">All Publications</Link></li>
              <li><Link to="/founder/nikhilendra-srinivas" className="hover:text-[#1d1d1f] transition-colors">Nationwide Lectures</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-[11px] uppercase tracking-wider text-[#1d1d1f] font-semibold">
              Trust & Access
            </h4>
            <ul className="space-y-2 text-[#6e6e73]">
              <li><Link to="/contact" className="hover:text-[#1d1d1f] transition-colors">Official Contact</Link></li>
              <li><Link to="/auth/login" className="hover:text-[#1d1d1f] transition-colors">Member Portal</Link></li>
              <li><Link to="/portal" className="hover:text-[#1d1d1f] transition-colors">Executive Portal</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-[#1d1d1f] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="hover:text-[#1d1d1f] transition-colors">Terms of Use</Link></li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-[#d2d2d7] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#86868b] text-center sm:text-left">
          <p>© {new Date().getFullYear()} COGNISRIN. All rights reserved. Registered domain: <a href="https://cognisrin.in" className="text-[#1d1d1f] hover:underline">cognisrin.in</a>.</p>
          <p className="text-[#86868b]">Dedicated to advancing Science, Innovation and Entrepreneurship.</p>
        </div>
      </div>
    </footer>
  );
};
