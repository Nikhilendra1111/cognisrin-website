import React, { useEffect } from 'react';

interface Props {
  title: string;
  description: string;
  canonicalPath?: string;
  schemaType?: 'Organization' | 'Person' | 'Article' | 'Book';
  customSchema?: Record<string, any>;
}

export const SEOHead: React.FC<Props> = ({
  title,
  description,
  canonicalPath = '',
  customSchema
}) => {
  useEffect(() => {
    // 1. Title
    const formattedTitle = `${title} | COGNISRIN`;
    document.title = formattedTitle;

    // 2. Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    // 3. Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const url = `https://cognisrin.in${canonicalPath}`;
      canonical.setAttribute('href', url);
    }

    // 4. Custom JSON-LD if provided
    let scriptTag: HTMLScriptElement | null = null;
    if (customSchema) {
      scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      scriptTag.innerHTML = JSON.stringify(customSchema);
      document.head.appendChild(scriptTag);
    }

    return () => {
      if (scriptTag && document.head.contains(scriptTag)) {
        document.head.removeChild(scriptTag);
      }
    };
  }, [title, description, canonicalPath, customSchema]);

  return null;
};
