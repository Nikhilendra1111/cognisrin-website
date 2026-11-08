import React, { useState } from 'react';
import { 
  Cpu, 
  X,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { SEOHead } from '../components/common/SEOHead';
import { InnovationProject, ProjectStatus } from '../types';

export const Innovations: React.FC = () => {
  const { projects } = useContent();
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<InnovationProject | null>(null);

  const statuses: ('All' | ProjectStatus)[] = ['All', 'Active', 'Prototype', 'Research', 'Concept'];

  const filteredProjects = projects.filter((p) => {
    return statusFilter === 'All' || p.status === statusFilter;
  });

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case 'Active':
        return 'bg-[#34c759]/10 text-[#28a745] border-[#34c759]/30';
      case 'Prototype':
        return 'bg-[#0071e3]/10 text-[#0066cc] border-[#0071e3]/30';
      case 'Research':
        return 'bg-[#af52de]/10 text-[#af52de] border-[#af52de]/30';
      case 'Concept':
        return 'bg-[#f5f5f7] text-[#86868b] border-[#d2d2d7]';
      default:
        return 'bg-[#f5f5f7] text-[#86868b] border-[#d2d2d7]';
    }
  };

  return (
    <div className="bg-[#ffffff] text-[#1d1d1f] space-y-20 pb-24">
      <SEOHead
        title="Innovations, Inventions & Technology Initiatives"
        description="Showcase of engineering projects, experimental inventions, and technology research initiatives pioneered at Cognisrin."
        canonicalPath="/innovations"
      />

      {/* Header */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 text-center border-b border-[rgba(0,0,0,0.08)]">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5f5f7] border border-[#d2d2d7] text-xs font-mono text-[#0066cc]">
            <span>APPLIED ENGINEERING & TRANSLATION</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-semibold text-[#1d1d1f] tracking-tight font-mono">
            Innovations & Technology Projects
          </h1>
          <p className="text-lg text-[#86868b] max-w-2xl mx-auto leading-relaxed">
            From experimental concepts to functional prototypes: showcasing inventions, hardware concepts, and research initiatives developed and guided by Cognisrin.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Status Pills */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[rgba(0,0,0,0.08)] pb-6">
          <div className="flex items-center gap-2 overflow-x-auto">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-1.5 rounded-full text-xs transition-all ${
                  statusFilter === status
                    ? 'bg-[#0071e3] text-white font-medium shadow-xs'
                    : 'bg-[#f5f5f7] text-[#515154] hover:text-[#1d1d1f] border border-[#d2d2d7]'
                }`}
              >
                {status} ({status === 'All' ? projects.length : projects.filter(p => p.status === status).length})
              </button>
            ))}
          </div>

          <p className="text-xs text-[#86868b] font-mono">
            Pioneered under the institutional guidance of Nikhilendra Srinivas
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="apple-card p-8 flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-4">
                
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#86868b]">{project.category}</span>
                  <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-medium ${getStatusBadge(project.status)}`}>
                    {project.status}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-2xl bg-[#ffffff] border border-[#d2d2d7] shadow-xs flex items-center justify-center text-[#0071e3]">
                  <Cpu className="w-5 h-5" />
                </div>

                <h3 className="text-xl font-semibold text-[#1d1d1f] tracking-tight group-hover:text-[#0071e3] transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs text-[#86868b] leading-relaxed line-clamp-3">
                  {project.description}
                </p>

              </div>

              <div className="pt-6 mt-6 border-t border-[rgba(0,0,0,0.06)] space-y-3">
                <p className="text-[10px] font-mono text-[#0066cc]">
                  {project.founderAttribution}
                </p>

                <div className="flex items-center justify-between text-xs text-[#0066cc] font-medium group-hover:translate-x-1 transition-transform">
                  <span>View Project Specifications</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="apple-card-elevated max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-10 space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-2 pr-8">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-medium ${getStatusBadge(selectedProject.status)}`}>
                  {selectedProject.status}
                </span>
                <span className="text-xs text-[#86868b] font-mono">{selectedProject.category}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1d1d1f] tracking-tight">
                {selectedProject.title}
              </h2>
              <p className="text-xs font-mono text-[#0066cc]">
                {selectedProject.founderAttribution}
              </p>
            </div>

            <div className="space-y-4 text-sm text-[#515154] leading-relaxed">
              <p>{selectedProject.description}</p>
              
              <div className="p-5 rounded-2xl bg-[#f5f5f7] border border-[#d2d2d7] space-y-2">
                <h4 className="text-xs uppercase font-mono tracking-wider text-[#1d1d1f] font-semibold">
                  Technical Specifications & Architecture
                </h4>
                <p className="text-xs text-[#515154] leading-relaxed">
                  {selectedProject.technicalDetails}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-[rgba(0,0,0,0.06)] flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.tags.map((t) => (
                  <span key={t} className="px-2.5 py-0.5 rounded-full bg-[#f5f5f7] border border-[#d2d2d7] text-xs text-[#86868b] font-mono">
                    #{t}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="apple-btn-secondary px-5 py-2 text-xs"
              >
                Close Overview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
