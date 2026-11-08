import React, { useState } from 'react';
import { 
  Atom, 
  Search, 
  Clock, 
  ChevronRight, 
  X,
  FileText
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { SEOHead } from '../components/common/SEOHead';
import { ScienceCategory, ScienceArticle } from '../types';

const CATEGORIES: ScienceCategory[] = [
  'Quantum Physics',
  'Nuclear Science',
  'Nanotechnology',
  'Chemistry',
  'Physics',
  'Scientific Research',
  'Emerging Technologies'
];

export const Science: React.FC = () => {
  const { articles } = useContent();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<ScienceArticle | null>(null);

  const filteredArticles = articles.filter((art) => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesQuery = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="bg-[#ffffff] text-[#1d1d1f] space-y-20 pb-24">
      <SEOHead
        title="Science & Scientific Research Directorate"
        description="Explore scientific exploration, quantum mechanics, nuclear science, nanotechnology, chemistry, and emerging technologies at Cognisrin."
        canonicalPath="/science"
      />

      {/* Header */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 text-center border-b border-[rgba(0,0,0,0.08)]">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5f5f7] border border-[#d2d2d7] text-xs font-mono text-[#0066cc]">
            <span>KNOWLEDGE & INQUIRY REPOSITORY</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-semibold text-[#1d1d1f] tracking-tight font-mono">
            Science & Fundamental Exploration
          </h1>
          <p className="text-lg text-[#86868b] max-w-2xl mx-auto leading-relaxed">
            Advancing rigorous inquiry into fundamental physics, molecular dynamics, nuclear architectures, and nanostructures. Guided by empirical truth and first principles.
          </p>
        </div>
      </section>

      {/* Category Pills & Search */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative">
          <Search className="w-4 h-4 text-[#86868b] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search quantum physics, nanotechnology, chemistry..."
            className="w-full pl-11 pr-4 py-3 rounded-full bg-[#f5f5f7] border border-[#d2d2d7] text-[#1d1d1f] placeholder-[#86868b] text-sm focus:outline-none focus:border-[#0071e3] focus:bg-[#ffffff] transition-all"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-1.5 rounded-full text-xs transition-all ${
              selectedCategory === 'All'
                ? 'bg-[#0071e3] text-white font-medium shadow-xs'
                : 'bg-[#f5f5f7] text-[#515154] hover:text-[#1d1d1f] border border-[#d2d2d7]'
            }`}
          >
            All Disciplines ({articles.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = articles.filter(a => a.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0071e3] text-white font-medium shadow-xs'
                    : 'bg-[#f5f5f7] text-[#515154] hover:text-[#1d1d1f] border border-[#d2d2d7]'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="apple-card p-8 flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#0066cc] font-medium">{article.category}</span>
                  <span className="flex items-center gap-1 text-[#86868b]">
                    <Clock className="w-3 h-3" />
                    {article.readTimeMinutes} min read
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-[#1d1d1f] tracking-tight group-hover:text-[#0071e3] transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-[#86868b] leading-relaxed line-clamp-3">
                  {article.abstract}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[rgba(0,0,0,0.06)] flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {article.tags.slice(0, 2).map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-[#ffffff] border border-[#d2d2d7] text-[10px] text-[#86868b] font-mono">
                      #{t}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-[#0066cc] font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Monograph <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16 space-y-3">
            <p className="text-sm text-[#86868b]">No research articles found matching your query.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="apple-btn-secondary text-xs"
            >
              Reset Filters
            </button>
          </div>
        )}

      </section>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="apple-card-elevated max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-10 space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-3 pr-8">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#0071e3]/10 text-[#0066cc] border border-[#0071e3]/20 text-xs font-mono font-medium">
                  {activeArticle.category}
                </span>
                <span className="text-xs text-[#86868b] font-mono">
                  {activeArticle.readTimeMinutes} min read • Published {activeArticle.publishedAt}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1d1d1f] tracking-tight">
                {activeArticle.title}
              </h2>

              <p className="text-xs font-mono text-[#86868b]">
                Author: <span className="text-[#1d1d1f] font-semibold">{activeArticle.author}</span>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-[#d2d2d7] space-y-1">
              <p className="text-[10px] uppercase font-mono tracking-wider text-[#0066cc] font-semibold">Executive Abstract</p>
              <p className="text-xs text-[#515154] leading-relaxed italic">{activeArticle.abstract}</p>
            </div>

            <div className="text-sm text-[#1d1d1f] leading-relaxed space-y-4 pt-2 whitespace-pre-line border-t border-[rgba(0,0,0,0.06)]">
              {activeArticle.content}
            </div>

            <div className="pt-6 border-t border-[rgba(0,0,0,0.06)] flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {activeArticle.tags.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-full bg-[#f5f5f7] border border-[#d2d2d7] text-xs text-[#86868b] font-mono">
                    #{t}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="apple-btn-secondary px-5 py-2 text-xs"
              >
                Close Monograph
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
