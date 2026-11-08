import React from 'react';
import { 
  ShoppingBag, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { SEOHead } from '../components/common/SEOHead';
import { BookCoverPlaceholder } from '../components/common/BookCoverPlaceholder';

export const Publications: React.FC = () => {
  const { publications } = useContent();

  return (
    <div className="bg-[#ffffff] text-[#1d1d1f] space-y-20 pb-24">
      <SEOHead
        title="Notable Works & Publications by Nikhilendra Srinivas"
        description="Official publications authored by Nikhilendra Srinivas, Founder and Pioneer of Cognisrin, including The Entrepreneur Genesis and The Power Within – Quantum."
        canonicalPath="/publications"
      />

      {/* Header */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 text-center border-b border-[rgba(0,0,0,0.08)]">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5f5f7] border border-[#d2d2d7] text-xs font-mono text-[#0066cc]">
            <span>AUTHOR & SCHOLARLY WORKS</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-semibold text-[#1d1d1f] tracking-tight font-mono">
            Publications & Books
          </h1>
          <p className="text-lg text-[#86868b] max-w-2xl mx-auto leading-relaxed">
            Authored by Nikhilendra Srinivas, Founder and Pioneer of Cognisrin. Examining foundational enterprise creation, fundamental physical dynamics, and transformative thinking.
          </p>
        </div>
      </section>

      {/* Books Showcase */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {publications.map((book) => (
            <div
              key={book.id}
              className="apple-card p-8 sm:p-10 flex flex-col justify-between space-y-8"
            >
              <div className="w-full flex justify-center py-4">
                <BookCoverPlaceholder publication={book} />
              </div>

              <div className="space-y-3">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#0066cc] font-semibold">
                  {book.category}
                </span>
                <h3 className="text-2xl font-semibold text-[#1d1d1f] tracking-tight">
                  {book.title}
                </h3>
                {book.subtitle && (
                  <p className="text-xs text-[#86868b] italic">
                    {book.subtitle}
                  </p>
                )}
                <p className="text-xs font-semibold text-[#1d1d1f] pt-1">
                  Author: <span className="text-[#0066cc]">{book.author}</span>
                </p>
                <p className="text-xs text-[#86868b] leading-relaxed pt-2">
                  {book.description}
                </p>
              </div>

              <div className="pt-6 border-t border-[rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-center justify-between gap-4">
                {book.amazonPurchaseUrl && book.amazonPurchaseUrl.trim() !== '' ? (
                  <a
                    href={book.amazonPurchaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="apple-btn-primary px-6 py-2.5 text-xs font-medium w-full sm:w-auto"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Purchase on Amazon</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs font-mono text-[#86868b]">
                    Available at premier academic bookstores
                  </span>
                )}

                <span className="text-[11px] font-mono text-[#86868b]">
                  {book.publicationDate}
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* Note on Extensibility */}
        <div className="apple-card p-6 text-center text-xs text-[#86868b] border border-[#d2d2d7]">
          New scholarly books and monographs authored by Nikhilendra Srinivas can be dynamically added via the Cognisrin Administrator Portal.
        </div>

      </section>
    </div>
  );
};
