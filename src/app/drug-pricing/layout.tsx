import { DrugPricingProvider } from './context/DrugPricingContext';

export default function DrugPricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DrugPricingProvider>
      {children}
    </DrugPricingProvider>
  );
}