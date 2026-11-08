import React from 'react';
import { SEOHead } from '../../components/common/SEOHead';

export const Terms: React.FC = () => {
  return (
    <div className="bg-[#ffffff] text-[#1d1d1f] min-h-[85vh] py-16">
      <SEOHead
        title="Terms and Conditions of Use"
        description="Official terms of use governing access to the Cognisrin website (https://cognisrin.in)."
        canonicalPath="/terms-and-conditions"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2 border-b border-[rgba(0,0,0,0.08)] pb-6">
          <span className="text-xs font-mono uppercase text-[#0066cc] font-semibold">LEGAL & REGULATORY</span>
          <h1 className="text-3xl sm:text-5xl font-semibold text-[#1d1d1f] tracking-tight font-mono">
            Terms of Use
          </h1>
          <p className="text-xs text-[#86868b]">Effective Date: November 2026 • Official Domain: https://cognisrin.in</p>
        </div>

        <div className="apple-card p-8 sm:p-12 space-y-6 text-[#515154] text-sm leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[#1d1d1f]">1. Acceptance of Terms</h2>
            <p>
              By accessing and using this official website (https://cognisrin.in), you acknowledge and agree to comply with these Terms of Use. If you do not agree, please discontinue use of this site.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[#1d1d1f]">2. Intellectual Property Rights</h2>
            <p>
              All published content—including scientific articles, project blueprints, brand trademarks, logos, and literary works authored by Nikhilendra Srinivas (such as <em>The Entrepreneur Genesis</em> and <em>The Power Within – Quantum</em>)—are the exclusive intellectual property of Cognisrin and Nikhilendra Srinivas.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[#1d1d1f]">3. Acceptable Use</h2>
            <p>
              Users may view, read, and cite published materials for non-commercial educational and scholarly purposes provided proper attribution is maintained. Unauthorized reproduction, automated scraping, or commercial resale without written authorization is strictly prohibited.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[#1d1d1f]">4. Contact & Inquiries</h2>
            <p>
              For licensing inquiries or official permissions, contact the executive desk at <strong>contact@cognisrin.in</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
