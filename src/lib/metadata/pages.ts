import { Metadata } from 'next';
import { generatePageMetadata } from '../seo';

// Centralized page metadata configurations
export const pageMetadata = {
  home: generatePageMetadata({
    title: 'Home',
    description: 'Comprehensive financial services and insurance solutions tailored to your needs',
    keywords: ['financial services', 'insurance', 'financial planning'],
    path: '/'
  }),

  lifeInsurance: generatePageMetadata({
    title: 'Life Insurance',
    description: 'Comprehensive life insurance solutions to protect your family\'s financial future',
    keywords: ['life insurance', 'term life', 'whole life', 'family protection'],
    path: '/life-insurance'
  }),

  healthInsurance: generatePageMetadata({
    title: 'Health Insurance',
    description: 'Comprehensive health insurance plans to keep you and your family covered',
    keywords: ['health insurance', 'medical coverage', 'family health'],
    path: '/health-insurance'
  }),

  quote: generatePageMetadata({
    title: 'Get a Free Quote',
    description: 'Request a personalized insurance quote tailored to your unique needs',
    keywords: ['insurance quote', 'free consultation', 'insurance comparison'],
    path: '/quote'
  }),

  contact: generatePageMetadata({
    title: 'Contact Us',
    description: 'Get in touch with Buckalew Financial Services for personalized insurance solutions',
    keywords: ['contact', 'customer support', 'insurance consultation'],
    path: '/contact'
  }),

  privacyPolicy: generatePageMetadata({
    title: 'Privacy Policy',
    description: 'Our commitment to protecting your personal information and data privacy',
    keywords: ['privacy', 'data protection', 'legal'],
    path: '/privacy-policy'
  }),

  termsOfService: generatePageMetadata({
    title: 'Terms of Service',
    description: 'Terms and conditions governing the use of our financial services',
    keywords: ['terms', 'legal', 'service conditions'],
    path: '/terms-of-service'
  })
};

// Utility function to easily apply metadata to pages
export function applyPageMetadata(page: keyof typeof pageMetadata): Metadata {
  return pageMetadata[page];
}
