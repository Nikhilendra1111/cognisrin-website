import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2, Atom } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { SEOHead } from '../../components/common/SEOHead';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await resetPassword(email);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-[#ffffff]">
      <SEOHead
        title="Reset Password"
        description="Reset your password for your Cognisrin account."
        canonicalPath="/auth/forgot-password"
      />

      <div className="w-full max-w-md space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#f5f5f7] border border-[#d2d2d7] shadow-xs flex items-center justify-center mx-auto text-[#0071e3]">
            <Atom className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1d1d1f] tracking-tight font-mono">
            Reset Password
          </h2>
          <p className="text-xs text-[#86868b]">
            Enter your email to receive recovery instructions
          </p>
        </div>

        <div className="apple-card p-8 sm:p-10 space-y-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#34c759]/10 text-[#28a745] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-[#1d1d1f]">Check Your Inbox</h3>
              <p className="text-xs text-[#86868b] leading-relaxed">
                If an account exists with that address, we have dispatched password reset instructions.
              </p>
              <Link to="/auth/login" className="apple-btn-secondary text-xs inline-block">
                Return to Sign In
              </Link>
            </div>
          ) : (
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="apple-btn-primary w-full py-3 text-xs font-medium"
              >
                {isSubmitting ? 'Sending Request...' : 'Send Reset Link'}
              </button>
            </form>
          )}

          <div className="border-t border-[rgba(0,0,0,0.08)] pt-4 text-center">
            <Link to="/auth/login" className="text-xs text-[#0066cc] hover:underline flex items-center justify-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
