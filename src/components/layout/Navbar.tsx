import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Atom, 
  Menu, 
  X, 
  User, 
  ShieldCheck, 
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useContent } from '../../context/ContentContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, isCloudSynced } = useAuth();
  const { founderProfile } = useContent();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Science', path: '/science' },
    { name: 'Innovations', path: '/innovations' },
    { name: 'Entrepreneurship', path: '/entrepreneurship' },
    { name: 'Publications', path: '/publications' },
    { name: 'Founder', path: '/founder/nikhilendra-srinivas' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Apple Ribbon (#f5f5f7 / #6e6e73) */}
      <div className="bg-[#f5f5f7] border-b border-[rgba(0,0,0,0.08)] py-1.5 px-4 text-[11px] text-[#6e6e73]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3] animate-pulse" />
            <span className="text-[#86868b] uppercase tracking-wider font-semibold text-[10px]">FOUNDER & PIONEER</span>
            <span className="text-[#d2d2d7]">|</span>
            <Link 
              to="/founder/nikhilendra-srinivas" 
              className="text-[#1d1d1f] hover:text-[#0071e3] font-medium transition-colors flex items-center gap-1.5"
            >
              <span>{founderProfile.fullName}</span>
              <span className="text-[#86868b]">•</span>
              <span className="text-[#0066cc] font-normal">{founderProfile.designation}</span>
            </Link>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <span className="text-[#1d1d1f] font-mono text-[11px]">
              {founderProfile.lecturesMilestoneText}
            </span>
            {!isCloudSynced && (
              <span className="px-2 py-0.5 rounded-full bg-[#e8e8ed] text-[#86868b] text-[9px] border border-[#d2d2d7]">
                Preview Mode
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Apple Frosted Nav (rgba(255,255,255,0.8), saturate(180%) blur(20px)) */}
      <div className="apple-nav transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            
            {/* Apple Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-6 h-6 rounded-md bg-[#f5f5f7] border border-[rgba(0,0,0,0.08)] flex items-center justify-center">
                <Atom className="w-3.5 h-3.5 text-[#0071e3] group-hover:rotate-180 transition-transform duration-700" />
              </div>
              <span className="text-sm font-semibold tracking-tight text-[#1d1d1f] font-mono">
                COGNISRIN
              </span>
            </Link>

            {/* Apple Nav Items (12px, #515154 hover: #000000) */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1 rounded-full text-xs transition-colors duration-150 ${
                    isActive(link.path)
                      ? 'text-[#1d1d1f] bg-[rgba(0,0,0,0.06)] font-medium'
                      : 'text-[#515154] hover:text-[#1d1d1f] hover:bg-[rgba(0,0,0,0.03)]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Apple Action CTA */}
            <div className="hidden lg:flex items-center space-x-2">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#34c759]/10 text-[#28a745] border border-[#34c759]/30 hover:bg-[#34c759]/20 transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin</span>
                </Link>
              )}

              {user ? (
                <Link
                  to="/dashboard"
                  className="px-3 py-1 rounded-full text-xs font-medium text-[#1d1d1f] bg-[#f5f5f7] border border-[#d2d2d7] hover:border-[#86868b] transition-all flex items-center gap-1.5"
                >
                  <User className="w-3 h-3 text-[#0071e3]" />
                  <span>{user.fullName || 'Dashboard'}</span>
                </Link>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/auth/login"
                    className="px-3 py-1 text-xs font-normal text-[#515154] hover:text-[#1d1d1f] transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth/register"
                    className="apple-btn-primary px-3.5 py-1 text-xs text-white"
                  >
                    Join Cognisrin
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex items-center gap-2">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="p-1 rounded-full bg-[#34c759]/10 text-[#28a745] border border-[#34c759]/20"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                </Link>
              )}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1.5 rounded-lg text-[#515154] hover:text-[#1d1d1f]"
                aria-label="Toggle navigation"
              >
                {isOpen ? <X className="w-5 h-5 text-[#1d1d1f]" /> : <Menu className="w-5 h-5 text-[#1d1d1f]" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#ffffff] border-b border-[rgba(0,0,0,0.08)] px-6 py-6 space-y-4 shadow-lg">
          <div className="p-3.5 rounded-2xl bg-[#f5f5f7] border border-[#d2d2d7] flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#0066cc] uppercase font-semibold">Founder and Pioneer</p>
              <p className="text-sm font-medium text-[#1d1d1f]">{founderProfile.fullName}</p>
            </div>
            <Link
              to="/founder/nikhilendra-srinivas"
              onClick={() => setIsOpen(false)}
              className="text-xs text-[#0066cc] flex items-center gap-1"
            >
              Profile <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`px-3 py-2.5 rounded-xl text-sm transition-all ${
                  isActive(link.path)
                    ? 'text-[#1d1d1f] bg-[rgba(0,0,0,0.06)] font-medium'
                    : 'text-[#515154] hover:text-[#1d1d1f]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-[rgba(0,0,0,0.08)] flex gap-2">
            {user ? (
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 rounded-full bg-[#f5f5f7] text-[#1d1d1f] text-xs font-medium border border-[#d2d2d7]"
              >
                Dashboard ({user.fullName})
              </Link>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center py-2.5 rounded-full bg-[#f5f5f7] text-[#1d1d1f] text-xs font-medium border border-[#d2d2d7]"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/register"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center py-2.5 rounded-full bg-[#0071e3] text-white text-xs font-medium"
                >
                  Join Cognisrin
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
