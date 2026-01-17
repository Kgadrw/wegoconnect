import { useEffect } from 'react';

interface ProductStructuredData {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  availability?: string;
  category?: string;
  sku?: string;
  brand?: string;
}

interface CategoryStructuredData {
  name: string;
  description?: string;
  url?: string;
}

interface StructuredDataProps {
  type: 'product' | 'category' | 'website' | 'breadcrumb';
  data: ProductStructuredData | CategoryStructuredData | any;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export const StructuredData = ({ type, data, breadcrumbs }: StructuredDataProps) => {
  useEffect(() => {
    let structuredData: any = {};

    switch (type) {
      case 'product':
        const productData = data as ProductStructuredData;
        structuredData = {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: productData.name,
          description: productData.description,
          image: productData.image,
          brand: {
            '@type': 'Brand',
            name: productData.brand || 'WegoConnect',
          },
          offers: {
            '@type': 'Offer',
            price: productData.price,
            priceCurrency: productData.currency || 'RWF',
            availability: productData.availability 
              ? `https://schema.org/${productData.availability}`
              : 'https://schema.org/InStock',
            url: window.location.href,
          },
        };
        if (productData.category) {
          structuredData.category = productData.category;
        }
        if (productData.sku) {
          structuredData.sku = productData.sku;
        }
        break;

      case 'category':
        const categoryData = data as CategoryStructuredData;
        structuredData = {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: categoryData.name,
          description: categoryData.description || `Browse ${categoryData.name} products at WegoConnect`,
          url: categoryData.url || window.location.href,
        };
        break;

      case 'website':
        structuredData = {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'WegoConnect',
          description: 'High-speed satellite internet powered by Starlink. Professional installation and 24/7 support across Rwanda.',
          url: window.location.origin,
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${window.location.origin}/?search={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        };
        break;

      case 'breadcrumb':
        if (breadcrumbs && breadcrumbs.length > 0) {
          structuredData = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbs.map((crumb, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: crumb.name,
              item: crumb.url,
            })),
          };
        }
        break;
    }

    // Remove existing structured data script
    const existingScript = document.getElementById('structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data script
    const script = document.createElement('script');
    script.id = 'structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Cleanup
    return () => {
      const scriptToRemove = document.getElementById('structured-data');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [type, data, breadcrumbs]);

  return null;
};
