/**
 * vite-plugin-static-seo.ts
 * 
 * Custom Vite plugin that generates per-route static HTML files at build time.
 * Each route gets its own index.html with unique <title>, <meta description>,
 * <canonical>, <og:*>, <twitter:*> tags, and a <noscript> content block so
 * crawlers that don't execute JavaScript still see unique, indexable content.
 */

import { Plugin } from 'vite';
import * as fs from 'fs';
import * as path from 'path';

interface RouteMetadata {
  path: string;
  title: string;
  description: string;
  priority: number;
  noscriptContent: string;
}

const ROUTES: RouteMetadata[] = [
  {
    path: '/',
    title: 'COGNISRIN — Advancing Science. Inspiring Innovation. Empowering Entrepreneurship.',
    description: 'Cognisrin is an independent organisation founded and pioneered by Nikhilendra Srinivas, dedicated to encouraging scientific exploration, technological innovation, and entrepreneurial thinking.',
    priority: 1.0,
    noscriptContent: `
      <h1>COGNISRIN — Advancing Science. Inspiring Innovation. Empowering Entrepreneurship.</h1>
      <p>Cognisrin is an independent organisation founded and pioneered by <strong>Nikhilendra Srinivas</strong> — Author, Entrepreneur, and Science Enthusiast with 600+ keynote lectures delivered across India.</p>
      <p>Cognisrin bridges fundamental scientific inquiry with pragmatic technological innovation and entrepreneurial venture creation.</p>
      <h2>Core Pillars</h2>
      <ul>
        <li><strong>Science &amp; Exploration</strong> — Encouraging empirical inquiry, foundational research in physics, chemistry, nanotechnology, and quantum systems.</li>
        <li><strong>Innovation &amp; Technology</strong> — Developing experimental prototypes, engineering novel technology concepts.</li>
        <li><strong>Entrepreneurship</strong> — Empowering visionary builders with resilient venture frameworks and deep-tech incubation.</li>
      </ul>
      <h2>Published Works</h2>
      <ul>
        <li><a href="/publications">The Entrepreneur Genesis</a> — by Nikhilendra Srinivas</li>
        <li><a href="/publications">The Power Within – Quantum</a> — by Nikhilendra Srinivas</li>
      </ul>
      <p>Contact: <a href="mailto:nikhilendrasrinivas5@gmail.com">nikhilendrasrinivas5@gmail.com</a></p>
      <nav>
        <a href="/about">About</a> |
        <a href="/founder/nikhilendra-srinivas">Founder</a> |
        <a href="/science">Science</a> |
        <a href="/innovations">Innovations</a> |
        <a href="/entrepreneurship">Entrepreneurship</a> |
        <a href="/publications">Publications</a> |
        <a href="/contact">Contact</a>
      </nav>
    `
  },
  {
    path: '/about',
    title: 'About Cognisrin — Mission, Vision & Founding Philosophy | COGNISRIN',
    description: 'Learn about Cognisrin, an independent organisation founded and pioneered by Nikhilendra Srinivas, dedicated to advancing Science, Innovation, and Entrepreneurship.',
    priority: 0.9,
    noscriptContent: `
      <h1>About Cognisrin</h1>
      <h2>Mission</h2>
      <p>To ignite rigorous scientific curiosity, cultivate pioneering engineering innovation, and empower entrepreneurial initiatives that solve foundational challenges and build long-term societal value.</p>
      <h2>Vision</h2>
      <p>To establish an enduring global institution recognized for elevating scientific inquiry, nurturing visionary inventors, and translating discovery into technological and economic progress.</p>
      <h2>Founding Philosophy</h2>
      <p>Anchored in first-principles thinking and championed by Founder and Pioneer Nikhilendra Srinivas, Cognisrin operates on the principle that sustainable civilizational advancement requires an unbroken continuum between theoretical science, applied technology, and principled enterprise.</p>
      <p>Contact: <a href="mailto:nikhilendrasrinivas5@gmail.com">nikhilendrasrinivas5@gmail.com</a></p>
    `
  },
  {
    path: '/founder/nikhilendra-srinivas',
    title: 'Nikhilendra Srinivas — Founder & Pioneer of Cognisrin | COGNISRIN',
    description: 'Official biography of Nikhilendra Srinivas — Founder of Cognisrin, Author of The Entrepreneur Genesis and The Power Within – Quantum, Entrepreneur, and Science Enthusiast with 600+ keynote lectures across India.',
    priority: 0.95,
    noscriptContent: `
      <h1>Nikhilendra Srinivas — Founder & Pioneer of Cognisrin</h1>
      <p><strong>Nikhilendra Srinivas</strong> is the Founder and Pioneer of Cognisrin, an independent organisation committed to encouraging scientific inquiry, technological innovation, and disciplined entrepreneurial thinking across India and beyond.</p>
      <h2>Biographical Information</h2>
      <ul>
        <li><strong>Date of Birth:</strong> 31 May 2008</li>
        <li><strong>Place of Birth:</strong> Gadwal, Telangana, India</li>
        <li><strong>Education:</strong> Undergraduate at Osmania University</li>
        <li><strong>Email:</strong> <a href="mailto:nikhilendrasrinivas5@gmail.com">nikhilendrasrinivas5@gmail.com</a></li>
      </ul>
      <h2>Published Works</h2>
      <ul>
        <li>The Entrepreneur Genesis — Foundational guide on scientific-driven venture creation</li>
        <li>The Power Within – Quantum — Deep dive into quantum technologies</li>
      </ul>
      <h2>Professional Profiles</h2>
      <ul>
        <li><a href="https://www.amazon.com/author/nikhilendrasrinivas" rel="me noopener" target="_blank">Amazon Author Page</a></li>
        <li><a href="https://www.linkedin.com/in/nikhilendra-srinivas-b7a61528a" rel="me noopener" target="_blank">LinkedIn Profile</a></li>
      </ul>
      <p>Having delivered more than 600 lectures across academic institutions, public symposiums, and research forums throughout India, Nikhilendra has continually championed the democratization of scientific curiosity and rigorous innovation.</p>
    `
  },
  {
    path: '/founder',
    title: 'Nikhilendra Srinivas — Founder & Pioneer of Cognisrin | COGNISRIN',
    description: 'Official biography of Nikhilendra Srinivas — Founder of Cognisrin, Author, Entrepreneur, and Science Enthusiast with 600+ keynote lectures across India.',
    priority: 0.6,
    noscriptContent: `
      <h1>Founder & Pioneer — Nikhilendra Srinivas</h1>
      <p>Visit the full biography at <a href="/founder/nikhilendra-srinivas">cognisrin.in/founder/nikhilendra-srinivas</a></p>
    `
  },
  {
    path: '/science',
    title: 'Science & Exploration — Quantum Physics, Nanotechnology, Nuclear Science | COGNISRIN',
    description: 'Explore Cognisrin\'s research domains spanning quantum physics, nanotechnology, nuclear science, advanced materials, and theoretical physics — curated by Nikhilendra Srinivas.',
    priority: 0.85,
    noscriptContent: `
      <h1>Science & Exploration</h1>
      <p>Cognisrin's scientific research spans foundational domains including quantum physics, nanotechnology, nuclear science, advanced materials, and theoretical physics.</p>
      <h2>Research Categories</h2>
      <ul>
        <li><strong>Quantum Physics</strong> — Investigating quantum entanglement, decoherence, and quantum computing foundations.</li>
        <li><strong>Nanotechnology</strong> — Nanoscale engineering, molecular self-assembly, and applications.</li>
        <li><strong>Nuclear Science</strong> — Nuclear energy, particle physics, and controlled fusion research.</li>
        <li><strong>Theoretical Physics</strong> — Mathematical frameworks and unified field investigations.</li>
        <li><strong>Advanced Materials</strong> — Metamaterials, 2D materials, and smart material development.</li>
      </ul>
      <p>All research is curated and supervised by Founder Nikhilendra Srinivas.</p>
    `
  },
  {
    path: '/innovations',
    title: 'Innovations & Technology Projects | COGNISRIN',
    description: 'Discover Cognisrin\'s innovation projects: deep-tech prototypes, experimental technologies, and engineering solutions developed under Nikhilendra Srinivas.',
    priority: 0.85,
    noscriptContent: `
      <h1>Innovations & Technology Projects</h1>
      <p>Cognisrin develops experimental prototypes and engineering solutions that translate scientific discoveries into practical technological advancements.</p>
      <p>All innovation projects are conceived and directed by Founder Nikhilendra Srinivas.</p>
    `
  },
  {
    path: '/publications',
    title: 'Publications — Books by Nikhilendra Srinivas | COGNISRIN',
    description: 'Official publications authored by Nikhilendra Srinivas, Founder and Pioneer of Cognisrin, including The Entrepreneur Genesis and The Power Within – Quantum.',
    priority: 0.85,
    noscriptContent: `
      <h1>Publications by Nikhilendra Srinivas</h1>
      <h2>The Entrepreneur Genesis</h2>
      <p>A foundational guide examining scientific-driven venture creation, first-principles entrepreneurial thinking, and institutional value building.</p>
      <h2>The Power Within – Quantum</h2>
      <p>An exploration of quantum technologies, fundamental physical dynamics, and their commercial and scientific potential.</p>
      <p>Both works are authored by Nikhilendra Srinivas, Founder and Pioneer of Cognisrin.</p>
      <p><a href="https://www.amazon.com/author/nikhilendrasrinivas" rel="me noopener" target="_blank">View on Amazon Author Page</a></p>
    `
  },
  {
    path: '/entrepreneurship',
    title: 'Entrepreneurship & Venture Building | COGNISRIN',
    description: 'Cognisrin\'s entrepreneurship pillar: deep-tech venture creation, startup frameworks, and innovation-driven enterprise — championed by Nikhilendra Srinivas.',
    priority: 0.8,
    noscriptContent: `
      <h1>Entrepreneurship & Venture Building</h1>
      <p>Cognisrin empowers visionary builders with resilient venture frameworks, deep-tech incubation paradigms, and practical execution methodologies to create lasting institutional value.</p>
      <p>The entrepreneurship pillar is championed by Founder Nikhilendra Srinivas, who has delivered 600+ lectures on entrepreneurial thinking across India.</p>
    `
  },
  {
    path: '/contact',
    title: 'Contact COGNISRIN — Official Inquiries & Communications',
    description: 'Contact Cognisrin and the executive office of Nikhilendra Srinivas for academic collaborations, research inquiries, and lecture invitations.',
    priority: 0.7,
    noscriptContent: `
      <h1>Contact COGNISRIN</h1>
      <p>Direct your inquiries regarding scientific collaborations, research papers, technology projects, or keynote lecture invitations for Nikhilendra Srinivas.</p>
      <h2>Contact Information</h2>
      <ul>
        <li><strong>Direct Email:</strong> <a href="mailto:nikhilendrasrinivas5@gmail.com">nikhilendrasrinivas5@gmail.com</a></li>
        <li><strong>Official Domain:</strong> <a href="https://cognisrin.in">https://cognisrin.in</a></li>
        <li><strong>Founder:</strong> Nikhilendra Srinivas</li>
      </ul>
      <p>Response Protocols: Inquiries are processed within 48-72 business hours.</p>
    `
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy & Data Transparency | COGNISRIN',
    description: 'Official privacy policy and account deletion procedures for Cognisrin (https://cognisrin.in).',
    priority: 0.4,
    noscriptContent: `
      <h1>Privacy Policy & Data Transparency</h1>
      <p>This document outlines the privacy policy and data handling procedures for Cognisrin (cognisrin.in).</p>
      <p>Contact: <a href="mailto:nikhilendrasrinivas5@gmail.com">nikhilendrasrinivas5@gmail.com</a></p>
    `
  },
  {
    path: '/terms-and-conditions',
    title: 'Terms and Conditions of Use | COGNISRIN',
    description: 'Official terms of use governing access to the Cognisrin website (https://cognisrin.in).',
    priority: 0.4,
    noscriptContent: `
      <h1>Terms and Conditions of Use</h1>
      <p>This document outlines the terms and conditions governing access to and use of the Cognisrin website.</p>
      <p>Contact: <a href="mailto:nikhilendrasrinivas5@gmail.com">nikhilendrasrinivas5@gmail.com</a></p>
    `
  }
];

export default function staticSeoPlugin(): Plugin {
  return {
    name: 'vite-plugin-static-seo',
    enforce: 'post',

    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const indexHtmlPath = path.join(distDir, 'index.html');

      if (!fs.existsSync(indexHtmlPath)) {
        console.warn('[static-seo] dist/index.html not found — skipping static SEO generation.');
        return;
      }

      const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
      let generatedCount = 0;

      for (const route of ROUTES) {
        // Skip homepage — it's already index.html
        if (route.path === '/') {
          // Still inject noscript into root index.html
          let html = baseHtml;
          html = injectNoscript(html, route.noscriptContent);
          fs.writeFileSync(indexHtmlPath, html, 'utf-8');
          generatedCount++;
          continue;
        }

        let html = baseHtml;

        // 1. Replace <title>
        html = html.replace(
          /<title>[^<]*<\/title>/,
          `<title>${escapeHtml(route.title)}</title>`
        );

        // 2. Replace meta name="title"
        html = html.replace(
          /<meta name="title" content="[^"]*" \/>/,
          `<meta name="title" content="${escapeAttr(route.title)}" />`
        );

        // 3. Replace meta name="description"
        html = html.replace(
          /<meta name="description" content="[^"]*" \/>/,
          `<meta name="description" content="${escapeAttr(route.description)}" />`
        );

        // 4. Replace canonical
        html = html.replace(
          /<link rel="canonical" href="[^"]*" \/>/,
          `<link rel="canonical" href="https://cognisrin.in${route.path}" />`
        );

        // 5. Replace OG tags
        html = html.replace(
          /<meta property="og:url" content="[^"]*" \/>/,
          `<meta property="og:url" content="https://cognisrin.in${route.path}" />`
        );
        html = html.replace(
          /<meta property="og:title" content="[^"]*" \/>/,
          `<meta property="og:title" content="${escapeAttr(route.title)}" />`
        );
        html = html.replace(
          /<meta property="og:description" content="[^"]*" \/>/,
          `<meta property="og:description" content="${escapeAttr(route.description)}" />`
        );

        // 6. Replace Twitter tags
        html = html.replace(
          /<meta name="twitter:url" content="[^"]*" \/>/,
          `<meta name="twitter:url" content="https://cognisrin.in${route.path}" />`
        );
        html = html.replace(
          /<meta name="twitter:title" content="[^"]*" \/>/,
          `<meta name="twitter:title" content="${escapeAttr(route.title)}" />`
        );
        html = html.replace(
          /<meta name="twitter:description" content="[^"]*" \/>/,
          `<meta name="twitter:description" content="${escapeAttr(route.description)}" />`
        );

        // 7. Inject <noscript> content
        html = injectNoscript(html, route.noscriptContent);

        // Write to route directory
        const routeDir = path.join(distDir, ...route.path.split('/').filter(Boolean));
        fs.mkdirSync(routeDir, { recursive: true });
        fs.writeFileSync(path.join(routeDir, 'index.html'), html, 'utf-8');
        generatedCount++;
      }

      console.log(`[static-seo] ✅ Generated ${generatedCount} pre-rendered HTML files for SEO crawlers.`);
    }
  };
}

function injectNoscript(html: string, content: string): string {
  return html.replace(
    '<div id="root"></div>',
    `<div id="root"></div>\n    <noscript>\n      <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:system-ui,sans-serif;color:#1d1d1f;">${content.trim()}\n      </div>\n    </noscript>`
  );
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttr(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
