import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Financial Calculators | Buckalew Financial',
  description: 'Use our financial calculators to plan your retirement, investments, and insurance needs'
};

export default function CalculatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}