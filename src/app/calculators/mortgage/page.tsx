import MortgageCalculator from '@/components/calculators/MortgageCalculator';

export default function MortgagePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Mortgage Calculator</h1>
      <MortgageCalculator />
    </div>
  );
}