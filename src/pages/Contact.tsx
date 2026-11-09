import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  Clock,
  Mail,
  MapPin,
  ShieldCheck
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { SEOHead } from '../components/common/SEOHead';

export const Contact: React.FC = () => {
  const { submitContactMessage, founderProfile } = useContent();

  const [form, setForm] = useState({
    name: '',
    email: '',
    category: 'General' as const,
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await submitContactMessage(form);
    setIsSubmitting(false);
    setSubmitted(true);
    setForm({
      name: '',
      email: '',
      category: 'General',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="bg-[#ffffff] text-[#1d1d1f] space-y-20 pb-24">
      <SEOHead
        title="Official Contact & Inquiries"
        description="Contact Cognisrin and the executive office of Nikhilendra Srinivas for academic collaborations, research inquiries, and lecture invitations."
        canonicalPath="/contact"
      />

      {/* Header */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 text-center border-b border-[rgba(0,0,0,0.08)]">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5f5f7] border border-[#d2d2d7] text-xs font-mono text-[#0066cc]">
            <span>COMMUNICATIONS & INQUIRIES</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-semibold text-[#1d1d1f] tracking-tight font-mono">
            Contact COGNISRIN
          </h1>
          <p className="text-lg text-[#86868b] max-w-2xl mx-auto leading-relaxed">
            Direct your inquiries regarding scientific collaborations, research papers, technology projects, or keynote lecture invitations for Nikhilendra Srinivas.
          </p>
        </div>
      </section>

      {/* Form Container */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="apple-card p-8 space-y-6">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#0066cc] font-semibold">
                  OFFICIAL COORDINATES
                </span>
                <h3 className="text-xl font-semibold text-[#1d1d1f] tracking-tight mt-1">
                  Executive Desk
                </h3>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div className="p-4 rounded-2xl bg-[#ffffff] border border-[#d2d2d7] space-y-1">
                  <p className="text-[#86868b] text-[10px]">Primary Inquiries</p>
                  <a 
                    href="mailto:nikhilendrasrinivas5@gmail.com" 
                    className="text-sm font-semibold text-[#0066cc] hover:underline break-all block"
                  >
                    nikhilendrasrinivas5@gmail.com
                  </a>
                </div>

                <div className="p-4 rounded-2xl bg-[#ffffff] border border-[#d2d2d7] space-y-1">
                  <p className="text-[#86868b] text-[10px]">Official Web Domain</p>
                  <p className="text-sm font-semibold text-[#1d1d1f]">https://cognisrin.in</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#ffffff] border border-[#d2d2d7] space-y-1">
                  <p className="text-[#86868b] text-[10px]">Founder & Pioneer</p>
                  <p className="text-sm font-semibold text-[#1d1d1f]">{founderProfile.fullName}</p>
                  <p className="text-[10px] text-[#0066cc]">{founderProfile.lecturesMilestoneText}</p>
                </div>
              </div>

              <div className="border-t border-[rgba(0,0,0,0.06)] pt-4 text-xs text-[#86868b] space-y-2">
                <p><strong>Response Protocols:</strong> Inquiries are processed within 48-72 business hours by the administrative secretariat.</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="apple-card p-8 sm:p-10">
              
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#34c759]/10 text-[#28a745] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1d1d1f]">Inquiry Dispatched Successfully</h3>
                  <p className="text-xs text-[#86868b] max-w-md mx-auto leading-relaxed">
                    Thank you for contacting Cognisrin. Your message has been logged in our secure communications archive.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="apple-btn-secondary text-xs mt-4"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-[#1d1d1f] tracking-tight">Direct Communications Form</h3>
                    <p className="text-xs text-[#86868b]">All fields are routed to verified Cognisrin officers.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[#515154]">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Dr. / Prof. / Full Name"
                        className="apple-input w-full"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[#515154]">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your.email@institution.edu"
                        className="apple-input w-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#515154]">Inquiry Category *</label>
                    <select
                      value={form.category}
                      onChange={(e: any) => setForm({ ...form, category: e.target.value })}
                      className="apple-input w-full bg-[#ffffff]"
                    >
                      <option value="General">General Inquiry</option>
                      <option value="Academic & Research">Academic & Scientific Research Collaboration</option>
                      <option value="Keynote Lecture Invitation">Keynote Lecture Invitation for Nikhilendra Srinivas</option>
                      <option value="Entrepreneurial Advisory">Entrepreneurship & Deep-Tech Venture Inquiries</option>
                      <option value="Media & Press">Media, Press & Monograph Publishing</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#515154]">Subject *</label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="Concise topic of your communication"
                      className="apple-input w-full"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#515154]">Detailed Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Please include relevant institutional background and specific details..."
                      className="apple-input w-full resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="apple-btn-primary w-full py-3 text-xs font-medium"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Transmitting...' : 'Dispatch Official Message'}</span>
                  </button>

                  <p className="text-[10px] text-center text-[#86868b] pt-1">
                    Your personal information is handled strictly according to the Cognisrin Privacy Policy.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
