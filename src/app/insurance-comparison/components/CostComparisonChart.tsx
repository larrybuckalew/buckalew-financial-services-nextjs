'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { InsurancePlan } from '../services/recommendationEngine';

interface CostComparisonProps {
  plans: InsurancePlan[];
  expectedVisits: number;
  expectedPrescriptions: number;
}

export function CostComparisonChart({
  plans,
  expectedVisits,
  expectedPrescriptions
}: CostComparisonProps) {
  // Calculate estimated annual costs for each plan
  const costData = plans.map(plan => {
    const annualPremium = plan.monthlyPremium * 12;
    const estimatedMedicalCosts = Math.min(
      expectedVisits * 100,
      plan.annualDeductible
    );
    const estimatedPrescriptionCosts = 
      expectedPrescriptions * plan.prescriptionCoverage.generic * 12;

    const totalCost = Math.min(
      annualPremium + estimatedMedicalCosts + estimatedPrescriptionCosts,
      plan.outOfPocketMax + annualPremium
    );

    return {
      name: plan.name,
      'Annual Premium': annualPremium,
      'Expected Medical Costs': estimatedMedicalCosts,
      'Expected Prescription Costs': estimatedPrescriptionCosts,
      'Total Cost': totalCost
    };
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        Annual Cost Comparison
      </h3>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={costData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip
              formatter={(value: number) => `$${value.toLocaleString()}`}
            />
            <Legend />
            <Bar dataKey="Annual Premium" fill="#285A84" />
            <Bar dataKey="Expected Medical Costs" fill="#85C872" />
            <Bar dataKey="Expected Prescription Costs" fill="#5EA669" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 text-sm text-gray-500">
        <p>* Estimates based on provided usage expectations</p>
        <p>* Actual costs may vary based on specific medical needs and circumstances</p>
      </div>
    </div>
  );
}