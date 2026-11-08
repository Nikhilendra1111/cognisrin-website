import React from 'react';
import { SEOHead } from '../../components/common/SEOHead';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-[#ffffff] text-[#1d1d1f] min-h-[85vh] py-16">
      <SEOHead
        title="Privacy Policy & Data Transparency"
        description="Official privacy policy and account deletion procedures for Cognisrin (https://cognisrin.in)."
        canonicalPath="/privacy-policy"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2 border-b border-[rgba(0,0,0,0.08)] pb-6">
          <span className="text-xs font-mono uppercase text-[#0066cc] font-semibold">LEGAL & TRUST POLICY</span>
          <h1 className="text-3xl sm:text-5xl font-semibold text-[#1d1d1f] tracking-tight font-mono">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#86868b]">Effective Date: November 2026 • Official Domain: https://cognisrin.in</p>
        </div>

        <div className="apple-card p-8 sm:p-12 space-y-6 text-[#515154] text-sm leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[#1d1d1f]">1. Overview and Organisation Identity</h2>
            <p>
              Cognisrin is an independent organisation founded and pioneered by Nikhilendra Srinivas, dedicated to advancing Science, Innovation, and Entrepreneurship. We are committed to maintaining data privacy and confidentiality for all visitors and registered members.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[#1d1d1f]">2. Information Collection</h2>
            <p>
              Browsing the Cognisrin official website is entirely public and does not require registration. When you voluntarily create a member account or submit an inquiry, we collect:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Account credentials (email address, full name, encrypted authentication tokens).</li>
              <li>Inquiry communications submitted through our contact forms.</li>
              <li>Basic technical logs (IP address, browser type) used strictly for security monitoring and DDoS mitigation.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[#1d1d1f]">3. How Information Is Used</h2>
            <p>
              Collected data is used solely to provide platform services, authenticate member accounts, and respond to academic or lecture inquiries. We do not sell, rent, or monetize personal user data to third-party advertising networks.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[#1d1d1f]">4. Account Deletion Process</h2>
            <p>
              Registered members have the right to request full deletion of their account and associated profile records at any time. To execute an account deletion:
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Log into your Member Dashboard and select "Request Account Deletion" under Account Settings, OR</li>
              <li>Send a direct deletion request to <strong>contact@cognisrin.in</strong> with the subject line <em>"Account Deletion Request"</em> from your registered email address.</li>
            </ol>
            <p>All associated records will be permanently purged within 30 days of verified confirmation.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[#1d1d1f]">5. Security and Infrastructure</h2>
            <p>
              Data transmission is protected via TLS 1.3 cryptographic protocols with Cloudflare Pages edge security. PostgreSQL database tables are safeguarded with strict Row Level Security (RLS) policies.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
