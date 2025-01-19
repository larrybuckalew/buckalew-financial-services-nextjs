import DashboardLayout from '@/components/layout/DashboardLayout';
import LoanCalculator from '@/components/calculators/LoanCalculator';
import InvestmentCalculator from '@/components/calculators/InvestmentCalculator';

export default function Tools() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <LoanCalculator />
        <InvestmentCalculator />
      </div>
    </DashboardLayout>
  );
}