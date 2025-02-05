import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calculator, FileText } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  type: string;
  premium: number;
  deductible: number;
  outOfPocketMax: number;
  coinsurance: number;
  copays: {
    primaryCare: number;
    specialist: number;
    urgentCare: number;
    emergency: number;
    genericDrugs: number;
    brandDrugs: number;
  };
  features: string[];
  network: string;
  prescription: string;
}

interface CostScenario {
  expenses: number;
  plan1Cost: number;
  plan2Cost: number;
}

export default function PlanComparison() {
  const [selectedPlans, setSelectedPlans] = useState<Plan[]>([]);
  const [yearlyMedicalExpenses, setYearlyMedicalExpenses] = useState(5000);
  const [prescriptionNeeds, setPrescriptionNeeds] = useState('low');
  const [specialistVisits, setSpecialistVisits] = useState(0);

  const calculateYearlyCost = (plan: Plan, expenses: number): number => {
    let totalCost = plan.premium * 12; // Annual premium
    let remainingExpenses = expenses;

    // Apply deductible
    if (remainingExpenses <= plan.deductible) {
      totalCost += remainingExpenses;
      remainingExpenses = 0;
    } else {
      totalCost += plan.deductible;
      remainingExpenses -= plan.deductible;
    }

    // Apply coinsurance
    if (remainingExpenses > 0) {
      const coinsuranceAmount = Math.min(
        remainingExpenses * (plan.coinsurance / 100),
        plan.outOfPocketMax - plan.deductible
      );
      totalCost += coinsuranceAmount;
    }

    return Math.min(totalCost, plan.outOfPocketMax + (plan.premium * 12));
  };

  const generateCostScenarios = (): CostScenario[] => {
    if (selectedPlans.length !== 2) return [];

    const scenarios = [];
    for (let expenses = 0; expenses <= 20000; expenses += 2000) {
      scenarios.push({
        expenses,
        plan1Cost: calculateYearlyCost(selectedPlans[0], expenses),
        plan2Cost: calculateYearlyCost(selectedPlans[1], expenses)
      });
    }
    return scenarios;
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Calculator className="w-6 h-6" />
          Plan Comparison Tool
        </h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Plan Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedPlans.map((plan, index) => (
              <Card key={index} className="border-2 border-blue-200">
                <CardHeader>
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <p className="text-sm text-gray-600">{plan.type}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Monthly Premium</p>
                        <p className="text-lg">${plan.premium}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Deductible</p>
                        <p className="text-lg">${plan.deductible}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Out-of-Pocket Max</p>
                        <p className="text-lg">${plan.outOfPocketMax}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Coinsurance</p>
                        <p className="text-lg">{plan.coinsurance}%</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Copays</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <p>Primary Care: ${plan.copays.primaryCare}</p>
                        <p>Specialist: ${plan.copays.specialist}</p>
                        <p>Urgent Care: ${plan.copays.urgentCare}</p>
                        <p>Emergency: ${plan.copays.emergency}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Features</p>
                      <ul className="text-sm space-y-1">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Cost Comparison Graph */}
          {selectedPlans.length === 2 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Cost Comparison</h3>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={generateCostScenarios()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="expenses"
                      label={{ value: 'Medical Expenses ($)', position: 'bottom' }}
                    />
                    <YAxis label={{ value: 'Total Cost ($)', angle: -90, position: 'left' }} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="plan1Cost"
                      name={selectedPlans[0].name}
                      stroke="#3b82f6"
                    />
                    <Line
                      type="monotone"
                      dataKey="plan2Cost"
                      name={selectedPlans[1].name}
                      stroke="#10b981"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Recommendation Section */}
          {selectedPlans.length === 2 && (
            <Card className="mt-8 bg-blue-50">
              <CardHeader>
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Plan Recommendation
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    Based on your expected medical expenses (${yearlyMedicalExpenses}/year):
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">{selectedPlans[0].name}</p>
                      <p className="text-2xl font-bold">
                        ${calculateYearlyCost(selectedPlans[0], yearlyMedicalExpenses).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600">Estimated yearly cost</p>
                    </div>
                    <div>
                      <p className="font-medium">{selectedPlans[1].name}</p>
                      <p className="text-2xl font-bold">
                        ${calculateYearlyCost(selectedPlans[1], yearlyMedicalExpenses).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600">Estimated yearly cost</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </CardContent>
    </Card>
  );
}