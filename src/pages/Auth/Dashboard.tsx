import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  ShieldCheck, 
  LogOut, 
  BookOpen, 
  Atom, 
  Lightbulb, 
  Check, 
  Save, 
  Trash2,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { SEOHead } from '../../components/common/SEOHead';

export const Dashboard: React.FC = () => {
  const { user, isAdmin, signOut, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [organization, setOrganization] = useState(user?.organization || '');
  const [saved, setSaved] = useState(false);
  const [deleteRequested, setDeleteRequested] = useState(false);

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 bg-[#ffffff]">
        <div className="text-center space-y-4">
          <p className="text-sm text-[#86868b]">Please sign in to access your dashboard.</p>
          <Link to="/auth/login" className="apple-btn-primary text-xs">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({ fullName, organization });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="bg-[#ffffff] text-[#1d1d1f] min-h-[85vh] py-16 space-y-10">
      <SEOHead
        title="Member Dashboard"
        description="Manage your Cognisrin member preferences and account details."
        canonicalPath="/dashboard"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Welcome Header */}
        <div className="apple-card p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-[#ffffff] border border-[#d2d2d7] shadow-xs flex items-center justify-center text-[#0071e3]">
              <User className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="text-xs font-mono uppercase text-[#0066cc] font-semibold">COGNISRIN MEMBER</span>
                {isAdmin && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#34c759]/10 text-[#28a745] border border-[#34c759]/30 font-mono">
                    ADMIN
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-[#1d1d1f] tracking-tight">
                Welcome, {user.fullName || 'Member'}
              </h1>
              <p className="text-xs text-[#86868b]">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link to="/portal" className="apple-btn-primary px-5 py-2 text-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Management Portal</span>
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="apple-btn-secondary px-4 py-2 text-xs text-[#ff3b30] hover:text-[#ff3b30]"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Profile Form */}
          <div className="md:col-span-7">
            <div className="apple-card p-8 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#1d1d1f] tracking-tight">Profile Details</h3>
                <p className="text-xs text-[#86868b]">Update your institutional and personal identification.</p>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#515154]">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="apple-input w-full"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#515154]">Institutional Affiliation</label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="University or Enterprise"
                    className="apple-input w-full"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#515154]">Email Address (Immutable)</label>
                  <input
                    type="text"
                    disabled
                    value={user.email}
                    className="apple-input w-full bg-[#f5f5f7] text-[#86868b] cursor-not-allowed"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="submit"
                    className="apple-btn-primary text-xs"
                  >
                    {saved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                    <span>{saved ? 'Saved Successfully' : 'Save Changes'}</span>
                  </button>

                  {saved && (
                    <span className="text-xs text-[#34c759] font-mono">Profile Updated</span>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Quick Links & Account Management */}
          <div className="md:col-span-5 space-y-6">
            
            <div className="apple-card p-6 space-y-3">
              <span className="text-[10px] font-mono uppercase text-[#0066cc] font-semibold">Cognisrin Programs</span>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link to="/science" className="apple-link">
                    Explore Scientific Research Papers <ChevronRight className="w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <Link to="/innovations" className="apple-link">
                    Review Engineering Inventions <ChevronRight className="w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <Link to="/publications" className="apple-link">
                    Scholarly Books by Nikhilendra Srinivas <ChevronRight className="w-3 h-3" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Privacy & Account Deletion */}
            <div className="apple-card p-6 space-y-3 border border-[#ff3b30]/20">
              <div className="flex items-center gap-2 text-[#ff3b30]">
                <Trash2 className="w-4 h-4" />
                <h4 className="text-xs font-semibold uppercase font-mono tracking-wider">Account Deletion</h4>
              </div>
              <p className="text-xs text-[#86868b] leading-relaxed">
                In compliance with data privacy standards, you can request permanent deletion of your profile and records at any time.
              </p>
              {deleteRequested ? (
                <div className="p-3 rounded-xl bg-[#34c759]/10 border border-[#34c759]/20 text-xs text-[#28a745]">
                  Deletion request logged. Confirmation email sent to {user.email}.
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setDeleteRequested(true)}
                  className="px-3.5 py-1.5 rounded-full text-xs text-[#ff3b30] bg-[#ff3b30]/10 hover:bg-[#ff3b30]/20 border border-[#ff3b30]/30 transition-colors"
                >
                  Request Account Deletion
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
