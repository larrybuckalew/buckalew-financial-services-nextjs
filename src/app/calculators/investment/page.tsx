import InvestmentCalculator from '@/components/calculators/InvestmentCalculator';

export default function InvestmentPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Investment Calculator</h1>
      <InvestmentCalculator />
    </div>
  );
}