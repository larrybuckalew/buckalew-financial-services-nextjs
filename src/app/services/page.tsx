import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services | Buckalew Financial Services',
  description: 'Complete insurance and financial services including life, health, Medicare, and more.',
  openGraph: {
    title: 'Our Services | Buckalew Financial Services',
    description: 'Complete insurance and financial services including life, health, Medicare, and more.',
    type: 'website', // Changed from 'service' to 'website'
  },
};

// Rest of the services page component...
export default function ServicesPage() {
  // Your existing component code
  return (
    <div>Services Page</div>
  );
}