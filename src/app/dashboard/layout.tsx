import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User Dashboard | Buckalew Financial Services',
  description: 'Manage your insurance policies, view financial summaries, and track your coverage with our comprehensive client dashboard.',
  keywords: ['dashboard', 'insurance management', 'financial overview', 'client portal'],
  openGraph: {
    title: 'User Dashboard | Buckalew Financial Services',
    description: 'Manage your insurance policies, view financial summaries, and track your coverage with our comprehensive client dashboard.',
    type: 'website'
  }
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}