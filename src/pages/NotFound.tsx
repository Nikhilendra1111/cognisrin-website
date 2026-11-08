import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Atom } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 bg-[#ffffff] text-[#1d1d1f]">
      <SEOHead
        title="Page Not Found"
        description="The requested page could not be located on the Cognisrin official portal."
        canonicalPath="/404"
      />

      <div className="text-center space-y-6 max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-[#f5f5f7] border border-[#d2d2d7] shadow-xs flex items-center justify-center mx-auto text-[#0071e3]">
          <Atom className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-6xl font-semibold text-[#1d1d1f] font-mono">404</h1>
          <h2 className="text-xl font-semibold text-[#1d1d1f]">Page Not Found</h2>
          <p className="text-xs text-[#86868b] leading-relaxed">
            The page you are looking for has been moved, renamed, or does not exist on the Cognisrin institutional network.
          </p>
        </div>

        <div>
          <Link
            to="/"
            className="apple-btn-primary px-6 py-2.5 text-xs font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
