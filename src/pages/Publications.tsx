import React from 'react';
import { 
  ShoppingBag, 
  ExternalLink,
  FileText,
  Atom,
  BookOpen,
  ArrowUpRight,
  Database,
  Calendar,
  UserCheck
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { SEOHead } from '../components/common/SEOHead';
import { BookCoverPlaceholder } from '../components/common/BookCoverPlaceholder';

export const Publications: React.FC = () => {
  const { publications, researchPublications } = useContent();

  const scholarlySchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ScholarlyArticle",
        "@id": "https://doi.org/10.5281/zenodo.24498507",
        "headline": "Computational Investigation of the H₂⁺ Molecular Ion: LCAO Approximation, Gaussian Basis-Set Convergence, and Independent Benchmark Validation",
        "name": "Computational Investigation of the H₂⁺ Molecular Ion: LCAO Approximation, Gaussian Basis-Set Convergence, and Independent Benchmark Validation",
        "author": {
          "@type": "Person",
          "name": "Nikhilendra Srinivas",
          "@id": "https://www.cognisrin.in/#person",
          "sameAs": [
            "https://orcid.org/0009-0001-7107-9241",
            "https://www.amazon.com/author/nikhilendrasrinivas",
            "https://www.linkedin.com/in/nikhilendra-srinivas-b7a61528a"
          ]
        },
        "datePublished": "2026",
        "identifier": "https://doi.org/10.5281/zenodo.24498507",
        "sameAs": "https://doi.org/10.5281/zenodo.24498507",
        "url": "https://doi.org/10.5281/zenodo.24498507",
        "description": "This computational study investigates the hydrogen molecular ion (H₂⁺) through molecular orbital theory, examining the minimal LCAO approximation, Gaussian basis-set comparisons, basis-set convergence, molecular dissociation behaviour, and independent validation against high-accuracy Riccati–Padé benchmark data.",
        "genre": "Preprint",
        "publisher": {
          "@type": "Organization",
          "name": "Zenodo"
        }
      }
    ]
  };

  return (
    <div className="bg-[#ffffff] text-[#1d1d1f] space-y-20 pb-24">
      <SEOHead
        title="Research Publications & Books by Nikhilendra Srinivas"
        description="Official research preprints, computational physics papers, and published books authored by Nikhilendra Srinivas, Founder and Pioneer of Cognisrin."
        canonicalPath="/publications"
        customSchema={scholarlySchema}
      />

      {/* Header */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 text-center border-b border-[rgba(0,0,0,0.08)]">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5f5f7] border border-[#d2d2d7] text-xs font-mono text-[#0066cc]">
            <span>SCHOLARLY OUTPUT & RESEARCH ARCHIVE</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-semibold text-[#1d1d1f] tracking-tight font-mono">
            Publications & Research
          </h1>
          <p className="text-lg text-[#86868b] max-w-2xl mx-auto leading-relaxed">
            Scholarly preprints, computational investigations in fundamental physics, and foundational books authored by Nikhilendra Srinivas, Founder and Pioneer of Cognisrin.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* SECTION 1: RESEARCH PUBLICATIONS */}
        <section id="research" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[rgba(0,0,0,0.06)] pb-4">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-[#0066cc] font-semibold">
                SCIENTIFIC PREPRINTS & SCHOLARLY PAPERS
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1d1d1f] tracking-tight mt-1">
                Research Publications
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#86868b]">
              <span>Permanent Archival Records</span>
            </div>
          </div>

          <div className="space-y-8">
            {researchPublications.map((paper) => (
              <article
                key={paper.id}
                className="apple-card p-6 sm:p-10 border border-[#d2d2d7] shadow-xs space-y-6 transition-all"
              >
                {/* Meta Header Badges */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#f5f5f7] text-[#0066cc] font-semibold border border-[#d2d2d7] text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                      <Atom className="w-3 h-3 text-[#0071e3]" />
                      <span>{paper.publicationType}</span>
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#f5f5f7] text-[#515154] border border-[#d2d2d7] text-[11px] flex items-center gap-1.5">
                      <Database className="w-3 h-3 text-[#86868b]" />
                      <span>{paper.repository}</span>
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#f5f5f7] text-[#515154] border border-[#d2d2d7] text-[11px] flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-[#86868b]" />
                      <span>Year: {paper.year}</span>
                    </span>
                  </div>

                  {/* ORCID Researcher Identifier */}
                  <a
                    href={paper.orcidUrl}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffffff] text-[#1d1d1f] hover:text-[#0066cc] border border-[#d2d2d7] text-[11px] transition-colors shadow-2xs group"
                    title="View Author on ORCID"
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-[#A6CE39] text-white flex items-center justify-center font-bold text-[8px] leading-none">
                      iD
                    </span>
                    <span className="font-semibold">ORCID:</span>
                    <span className="text-[#0066cc] group-hover:underline">{paper.orcid}</span>
                    <ArrowUpRight className="w-3 h-3 text-[#86868b] group-hover:text-[#0066cc]" />
                  </a>
                </div>

                {/* Paper Title */}
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#1d1d1f] tracking-tight leading-snug">
                    {paper.title}
                  </h3>
                  
                  {/* Author Attribution */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                    <span className="text-[#86868b]">Author:</span>
                    <span className="font-semibold text-[#1d1d1f] bg-[#f5f5f7] px-2.5 py-0.5 rounded-md border border-[#e5e5ea] inline-flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-[#0071e3]" />
                      {paper.author}
                    </span>
                    <span className="text-[#86868b] text-[11px] font-mono">
                      (Founder and Pioneer, Cognisrin)
                    </span>
                  </div>
                </div>

                {/* Permanent DOI Banner */}
                <div className="p-4 rounded-xl bg-[#f5f5f7] border border-[#d2d2d7] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-[#86868b] uppercase tracking-wider text-[10px] font-semibold">
                      Permanent DOI:
                    </span>
                    <a
                      href={paper.doiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0066cc] hover:underline font-semibold break-all inline-flex items-center gap-1"
                    >
                      <span>https://doi.org/{paper.doi}</span>
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    </a>
                  </div>
                  <span className="text-[10px] text-[#86868b] uppercase tracking-wider">
                    Zenodo Archive
                  </span>
                </div>

                {/* Abstract Section */}
                <div className="space-y-2 pt-1">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#0066cc] font-semibold block">
                    ABSTRACT
                  </span>
                  <p className="text-xs sm:text-sm text-[#424245] leading-relaxed font-sans bg-[#ffffff] p-5 rounded-xl border border-[#e5e5ea]">
                    {paper.abstract}
                  </p>
                </div>

                {/* Methodology & Topic Tags */}
                {paper.tags && paper.tags.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#86868b] block">
                      TOPIC CLASSIFICATIONS & METHODOLOGIES
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {paper.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md bg-[#f5f5f7] text-[#1d1d1f] text-[11px] font-mono border border-[#e5e5ea]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions / Primary Access Links */}
                <div className="pt-4 border-t border-[rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <a
                    href={paper.doiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="apple-btn-primary px-6 py-2.5 text-xs font-medium inline-flex items-center justify-center gap-2"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Access Full Paper via DOI (Zenodo)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={paper.orcidUrl}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="apple-btn-secondary px-5 py-2.5 text-xs font-medium inline-flex items-center justify-center gap-2"
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-[#A6CE39] text-white flex items-center justify-center font-bold text-[8px] leading-none">
                      iD
                    </span>
                    <span>ORCID Profile</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#0066cc]" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SECTION 2: AUTHORED BOOKS & MONOGRAPHS */}
        <section id="books" className="space-y-8 scroll-mt-24 pt-4 border-t border-[rgba(0,0,0,0.08)]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[rgba(0,0,0,0.06)] pb-4">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-[#0066cc] font-semibold">
                AUTHORED MONOGRAPHS & BOOKS
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1d1d1f] tracking-tight mt-1">
                Books by Nikhilendra Srinivas
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#86868b]">
              <span>Official Publications</span>
            </div>
          </div>

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
                      className="apple-btn-primary px-6 py-2.5 text-xs font-medium w-full sm:w-auto inline-flex items-center justify-center gap-2"
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

          {/* Academic Transparency Note */}
          <div className="apple-card p-6 text-center text-xs text-[#86868b] border border-[#d2d2d7] space-y-1">
            <p className="font-semibold text-[#1d1d1f]">Academic Transparency & Open Access</p>
            <p>
              Preprints and computational monographs authored by Nikhilendra Srinivas are registered with permanent Digital Object Identifiers (DOIs) and archived in open repositories to ensure verifiable scholarly provenance.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};
