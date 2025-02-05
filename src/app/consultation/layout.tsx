import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Schedule a Consultation | Buckalew Financial Services',
  description: 'Schedule a personalized consultation with our insurance experts.',
};

export default function ConsultationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}