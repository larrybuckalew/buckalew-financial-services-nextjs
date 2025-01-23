import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

interface RiskFormData {
  income: number;
  dependents: number;
  debt: number;
  savings: number;
}

export default function RiskAssessment() {
  const [formData, setFormData] = useState<RiskFormData>({
    income: 50000,
    dependents: 0,
    debt: 0,
    savings: 0
  });

  const calculateRiskScore = () => {
    const incomeScore = Math.min(formData.income / 50000, 2) * 25;
    const dependentScore = Math.max(0, 25 - formData.dependents * 5);
    const debtScore = Math.max(0, 25 - (formData.debt / formData.income) * 25);
    const savingsScore = Math.min((formData.savings / formData.income) * 25, 25);
    
    return Math.round(incomeScore + dependentScore + debtScore + savingsScore);
  };

  const getRiskLevel = (score: number) => {
    if (score >= 80) return { level: 'Low', color: 'text-green-600' };
    if (score >= 60) return { level: 'Moderate', color: 'text-yellow-600' };
    return { level: 'High', color: 'text-red-600' };
  };

  const score = calculateRiskScore();
  const risk = getRiskLevel(score);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">Financial Risk Assessment</h2>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Annual Income</label>
            <input
              type="number"
              value={formData.income}
              onChange={(e) => setFormData({ ...formData, income: parseInt(e.target.value) })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Number of Dependents</label>
            <input
              type="number"
              value={formData.dependents}
              onChange={(e) => setFormData({ ...formData, dependents: parseInt(e.target.value) })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Total Debt</label>
            <input
              type="number"
              value={formData.debt}
              onChange={(e) => setFormData({ ...formData, debt: parseInt(e.target.value) })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Total Savings</label>
            <input
              type="number"
              value={formData.savings}
              onChange={(e) => setFormData({ ...formData, savings: parseInt(e.target.value) })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mt-6 p-4 bg-gray-100 rounded">
            <h3 className="text-lg font-semibold mb-2">Risk Assessment Results</h3>
            <p className="text-3xl font-bold mb-2">{score}/100</p>
            <p className={`text-xl font-semibold ${risk.color}`}>Risk Level: {risk.level}</p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}