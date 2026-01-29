import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: object;
  lang?: 'ro' | 'ru';
}

export function SEO({ 
  title, 
  description, 
  keywords, 
  ogImage = 'https://www.rutemd.com/og-image.jpg',
  canonicalUrl,
  structuredData,
  lang = 'ro'
}: SEOProps) {
  const location = useLocation();
  const baseUrl = 'https://www.rutemd.com';
  
  // Get path without language prefix
  const pathWithoutLang = location.pathname.replace(/^\/(ro|ru)(\/|$)/, '/');
  const cleanPath = pathWithoutLang === '/' ? '' : pathWithoutLang;
  
  const fullUrl = canonicalUrl || `${baseUrl}/${lang}${cleanPath}`;
  const fullTitle = `${title} | RUTEMD`;

  useEffect(() => {
    // Update title
    document.title = fullTitle;

    // Update html lang attribute
    document.documentElement.lang = lang;

    // Update meta tags
    const metaTags: { [key: string]: string } = {
      'description': description,
      'og:title': fullTitle,
      'og:description': description,
      'og:url': fullUrl,
      'og:image': ogImage,
      'og:locale': lang === 'ru' ? 'ru_RU' : 'ro_RO',
      'twitter:title': fullTitle,
      'twitter:description': description,
      'twitter:image': ogImage,
    };

    if (keywords) {
      metaTags['keywords'] = keywords;
    }

    // Update or create meta tags
    Object.entries(metaTags).forEach(([key, value]) => {
      const isOgOrTwitter = key.startsWith('og:') || key.startsWith('twitter:');
      const attribute = isOgOrTwitter ? 'property' : 'name';
      
      let metaTag = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute(attribute, key);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', value);
    });

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    // Add hreflang tags for language alternates
    const hreflangs = [
      { lang: 'ro', url: `${baseUrl}/ro${cleanPath}` },
      { lang: 'ru', url: `${baseUrl}/ru${cleanPath}` },
      { lang: 'x-default', url: `${baseUrl}/ro${cleanPath}` }, // Default to Romanian
    ];

    // Remove old hreflang links
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());

    // Add new hreflang links
    hreflangs.forEach(({ lang: hreflang, url }) => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', hreflang);
      link.setAttribute('href', url);
      document.head.appendChild(link);
    });

    // Add structured data
    if (structuredData) {
      let script = document.querySelector('script[data-schema="page"]');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.setAttribute('data-schema', 'page');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, keywords, fullUrl, ogImage, structuredData, fullTitle, lang, cleanPath, baseUrl]);

  return null;
}
