import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  product?: {
    name: string;
    price: number;
    currency?: string;
    availability?: string;
    image?: string;
    description?: string;
    category?: string;
  };
  category?: {
    name: string;
    description?: string;
  };
}

export const useSEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  product,
  category,
}: SEOProps) => {
  useEffect(() => {
    const baseTitle = 'WegoConnect - Starlink Internet Provider Rwanda';
    const baseDescription = 'High-speed satellite internet powered by Starlink. Professional installation and 24/7 support across Rwanda.';
    const baseUrl = window.location.origin;
    const siteUrl = url || window.location.href;

    // Update document title
    if (title) {
      document.title = `${title} | ${baseTitle}`;
    } else {
      document.title = baseTitle;
    }

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description || baseDescription);
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    // Open Graph tags
    updateMetaTag('og:title', title ? `${title} | ${baseTitle}` : baseTitle, true);
    updateMetaTag('og:description', description || baseDescription, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', siteUrl, true);
    if (image) {
      updateMetaTag('og:image', image, true);
    } else if (product?.image) {
      updateMetaTag('og:image', product.image, true);
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title ? `${title} | ${baseTitle}` : baseTitle);
    updateMetaTag('twitter:description', description || baseDescription);
    if (image) {
      updateMetaTag('twitter:image', image);
    } else if (product?.image) {
      updateMetaTag('twitter:image', product.image);
    }

    // Product-specific meta tags
    if (product) {
      updateMetaTag('product:price:amount', product.price.toString(), true);
      updateMetaTag('product:price:currency', product.currency || 'RWF', true);
      if (product.availability) {
        updateMetaTag('product:availability', product.availability, true);
      }
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', siteUrl);

    // Cleanup function
    return () => {
      // Optionally reset to defaults on unmount
    };
  }, [title, description, keywords, image, url, type, product, category]);
};
