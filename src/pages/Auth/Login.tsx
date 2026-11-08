import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, User, Lock, Mail, ArrowRight, AlertCircle, Sparkles, Atom } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { SEOHead } from '../../components/common/SEOHead';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, toggleDemoAdmin, toggleDemoMember, isCloudSynced } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    const res = await signIn(email, password);
    setIsSubmitting(false);
    if (res.error) {
      setError(res.error);
    } else {
      if (email.trim().toLowerCase() === 'nikhilendrasrinivas5@gmail.com') {
        navigate('/portal');
      } else {
        navigate('/dashboard');
      }
    }
  };

  const handleDemoAdmin = () => {
    toggleDemoAdmin();
    navigate('/admin');
  };

  const handleDemoMember = () => {
    toggleDemoMember();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[78vh] flex items-center justify-center px-4 py-16 bg-[#ffffff]">
      <SEOHead
        title="Member Sign In"
        description="Access your Cognisrin account and member portal."
        canonicalPath="/auth/login"
      />

      <div className="w-full max-w-md space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#f5f5f7] border border-[#d2d2d7] shadow-xs flex items-center justify-center mx-auto text-[#0071e3]">
            <Atom className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1d1d1f] tracking-tight font-mono">
            Sign In to COGNISRIN
          </h2>
          <p className="text-xs text-[#86868b]">
            Access your research preferences, bookmarks, and verified profile
          </p>
        </div>

        {/* Login Box */}
        <div className="apple-card p-8 sm:p-10 space-y-6">
          
          {error && (
            <div className="p-3.5 rounded-xl bg-[#ff3b30]/10 border border-[#ff3b30]/20 flex items-center gap-2.5 text-xs text-[#ff3b30]">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#515154]">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#86868b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@institution.edu"
                  className="apple-input w-full pl-10"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono text-[#515154]">Password</label>
                <Link to="/auth/forgot-password" className="text-xs text-[#0066cc] hover:underline">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#86868b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="apple-input w-full pl-10"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="apple-btn-primary w-full py-3 text-xs font-medium"
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Secure Access Indicator */}
          <div className="border-t border-[rgba(0,0,0,0.08)] pt-4 text-center">
            <p className="text-[11px] text-[#86868b] flex items-center justify-center gap-1.5 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0071e3]" />
              <span>Encrypted Authentication System</span>
            </p>
          </div>

        </div>

        {/* Join Prompt */}
        <p className="text-center text-xs text-[#86868b]">
          Don't have an account yet?{' '}
          <Link to="/auth/register" className="text-[#0066cc] hover:underline font-medium">
            Join Cognisrin
          </Link>
        </p>

      </div>
    </div>
  );
};
