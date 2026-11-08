import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, User, Lock, Mail, Building, ArrowRight, AlertCircle, Atom } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { SEOHead } from '../../components/common/SEOHead';

export const Register: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    const res = await signUp(email, password, fullName, organization);
    setIsSubmitting(false);
    if (res.error) {
      setError(res.error);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-[78vh] flex items-center justify-center px-4 py-16 bg-[#ffffff]">
      <SEOHead
        title="Create Member Account"
        description="Join Cognisrin to participate in scientific programs and research publications."
        canonicalPath="/auth/register"
      />

      <div className="w-full max-w-md space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#f5f5f7] border border-[#d2d2d7] shadow-xs flex items-center justify-center mx-auto text-[#0071e3]">
            <Atom className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1d1d1f] tracking-tight font-mono">
            Join COGNISRIN
          </h2>
          <p className="text-xs text-[#86868b]">
            Become a part of an independent science and innovation community
          </p>
        </div>

        {/* Register Box */}
        <div className="apple-card p-8 sm:p-10 space-y-6">
          
          {error && (
            <div className="p-3.5 rounded-xl bg-[#ff3b30]/10 border border-[#ff3b30]/20 flex items-center gap-2.5 text-xs text-[#ff3b30]">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#515154]">Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#86868b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Dr. / Prof. / Full Name"
                  className="apple-input w-full pl-10"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#515154]">Email Address *</label>
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
              <label className="text-xs font-mono text-[#515154]">Institution / University (Optional)</label>
              <div className="relative">
                <Building className="w-4 h-4 text-[#86868b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="University / Research Lab / Enterprise"
                  className="apple-input w-full pl-10"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#515154]">Password (Minimum 6 Characters) *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#86868b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  minLength={6}
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
              <span>{isSubmitting ? 'Creating Membership...' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-[10px] text-center text-[#86868b]">
            By registering, you agree to Cognisrin's <Link to="/terms-and-conditions" className="text-[#0066cc] underline">Terms of Use</Link> and <Link to="/privacy-policy" className="text-[#0066cc] underline">Privacy Policy</Link>.
          </p>

        </div>

        {/* Sign In Prompt */}
        <p className="text-center text-xs text-[#86868b]">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-[#0066cc] hover:underline font-medium">
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
};
