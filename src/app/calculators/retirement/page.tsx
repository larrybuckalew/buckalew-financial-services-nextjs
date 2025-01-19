import RetirementCalculator from '@/components/calculators/RetirementCalculator';

export default function RetirementPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Retirement Calculator</h1>
      <RetirementCalculator />
    </div>
  );
}