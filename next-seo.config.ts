import { DefaultSeoProps } from 'next-seo';

const SEO: DefaultSeoProps = {
  title: 'Buckalew Financial Services | Comprehensive Insurance Solutions',
  description: 'Expert insurance guidance for life, health, and financial protection in Tampa Bay. Personalized solutions for term life, whole life, Medicare, and more.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://buckalewfinancialservices.com',
    site_name: 'Buckalew Financial Services',
    images: [
      {
        url: 'https://buckalewfinancialservices.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Buckalew Financial Services - Your Trusted Insurance Partner'
      }
    ]
  },
  twitter: {
    handle: '@buckalew_fin',
    site: '@buckalew_fin',
    cardType: 'summary_large_image'
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'life insurance, health insurance, Medicare, term life, whole life, universal life, final expense, accidental death, Tampa Bay insurance'
    },
    {
      name: 'author',
      content: 'Buckalew Financial Services'
    }
  ],
  canonical: 'https://buckalewfinancialservices.com'
};

export default SEO;
