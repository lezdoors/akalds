import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Always the production origin — canonicals must not point at preview deploys.
const SITE_URL = 'https://www.akalds.com';

interface SEOHeadProps {
  title: string;
  description: string;
  /** Override for the canonical URL. Defaults to the current path on the production origin. */
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  structuredData?: object;
  noIndex?: boolean;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function removeMeta(attr: 'name' | 'property', key: string) {
  document.head.querySelector(`meta[${attr}="${key}"]`)?.remove();
}

function upsertLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (hreflang) el.setAttribute('hreflang', hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

// Direct-DOM <head> manager. react-helmet-async silently failed to apply
// under React 18 lazy/Suspense, leaving every page with the static
// index.html metadata — an effect is deterministic.
export function SEOHead({
  title,
  description,
  canonical,
  ogImage = '/brand/og-image.jpg',
  ogType = 'website',
  structuredData,
  noIndex = false,
}: SEOHeadProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = title.includes('Akal') ? title : `${title} | Akal Digital Services Ltd`;

    // Self-referencing canonical: /en pages canonicalize to /en, not to the
    // French sibling. An explicit prop only wins if it is already absolute.
    const path = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
    const fullCanonical =
      canonical && canonical.startsWith('http') ? canonical : `${SITE_URL}${path}`;
    const fullOgImage = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;

    document.title = fullTitle;
    upsertMeta('name', 'description', description);
    upsertLink('canonical', fullCanonical);

    if (noIndex) {
      upsertMeta('name', 'robots', 'noindex,nofollow');
    } else {
      removeMeta('name', 'robots');
    }

    // hreflang alternates — every route exists in both languages.
    const frPath = path.replace(/^\/en(?=\/|$)/, '') || '/';
    const enPath = frPath === '/' ? '/en' : `/en${frPath}`;
    upsertLink('alternate', `${SITE_URL}${frPath}`, 'fr');
    upsertLink('alternate', `${SITE_URL}${enPath}`, 'en');
    upsertLink('alternate', `${SITE_URL}${frPath}`, 'x-default');

    // Open Graph
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', ogType);
    upsertMeta('property', 'og:image', fullOgImage);
    upsertMeta('property', 'og:image:alt', `${title} - Akal Digital Services Ltd`);
    upsertMeta('property', 'og:url', fullCanonical);
    upsertMeta('property', 'og:site_name', 'Akal Digital Services Ltd');

    // Twitter
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', fullOgImage);

    upsertMeta('name', 'author', 'Akal Digital Services Ltd');

    // Per-page structured data lives in its own tag; the static Organization
    // schema in index.html is left untouched.
    const scriptId = 'seo-structured-data';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    const hasData =
      structuredData && (!Array.isArray(structuredData) || structuredData.length > 0);
    if (hasData) {
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    } else {
      script?.remove();
    }
  }, [title, description, canonical, ogImage, ogType, structuredData, noIndex, pathname]);

  return null;
}
