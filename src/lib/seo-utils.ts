import { NextSeoProps } from 'next-seo';

interface SEOParams {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}

export function generatePageSEO({
  title, 
  description, 
  path, 
  ogImage = '/og-image.jpg'
}: SEOParams): NextSeoProps {
  const fullTitle = `${title} | Buckalew Financial Services`;
  const canonicalUrl = `https://buckalewfinancialservices.com${path}`;

  return {
    title: fullTitle,
    description,
    canonical: canonicalUrl,
    openGraph: {
      url: canonicalUrl,
      title: fullTitle,
      description,
      images: [{ 
        url: `https://buckalewfinancialservices.com${ogImage}`,
        width: 1200,
        height: 630,
        alt: title
      }],
      siteName: 'Buckalew Financial Services'
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: description.split(' ').slice(0, 20).join(', ')
      }
    ]
  };
}

export function generateBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "name": "Buckalew Financial Services",
    "description": "Comprehensive insurance solutions in Tampa Bay",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3031 Mojave Oak Dr",
      "addressLocality": "Valrico",
      "addressRegion": "FL",
      "postalCode": "33594",
      "addressCountry": "US"
    },
    "telephone": "(813) 555-1234",
    "url": "https://buckalewfinancialservices.com"
  };
}
