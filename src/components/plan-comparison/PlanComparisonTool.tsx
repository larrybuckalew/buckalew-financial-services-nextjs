import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

interface PlanFeature {
  name: string;
  description: string;
  plans: {
    [key: string]: boolean | string;
  };
}

interface Plan {
  id: string;
  name: string;
  type: string;
  monthlyPremium: number;
  annualDeductible: number;
  features: {
    [key: string]: boolean | string;
  };
}

interface PlanComparisonToolProps {
  planType: 'medicare-advantage' | 'medicare-supplement' | 'part-d' | 'dental-vision';
  preSelectedPlans?: string[];
  onCompare?: (selectedPlans: Plan[]) => void;
}

export default function PlanComparisonTool({ 
  planType,
  preSelectedPlans = [],
  onCompare 
}: PlanComparisonToolProps) {
  const [step, setStep] = useState(1);
  const [zipCode, setZipCode] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [compareResults, setCompareResults] = useState<Plan[]>([]);

  // Placeholder data - in real implementation, this would come from an API
  const features: PlanFeature[] = [
    {
      name: 'Prescription Drug Coverage',
      description: 'Coverage for prescription medications',
      plans: {
        'plan-a': true,
        'plan-b': true,
        'plan-c': false
      }
    },
    {
      name: 'Dental Coverage',
      description: 'Coverage for dental services',
      plans: {
        'plan-a': true,
        'plan-b': false,
        'plan-c': true
      }
    },
    // Add more features as needed
  ];

  const handleZipCodeSubmit = () => {
    if (zipCode.length === 5) {
      setStep(2);
    }
  };

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const handleComparison = () => {
    // In real implementation, this would fetch from an API based on selections
    const results: Plan[] = [
      {
        id: 'plan-a',
        name: 'Comprehensive Plan A',
        type: 'Medicare Advantage',
        monthlyPremium: 0,
        annualDeductible: 200,
        features: {
          'prescription': true,
          'dental': true,
          'vision': true
        }
      },
      // Add more plans
    ];

    setCompareResults(results);
    setStep(3);
    if (onCompare) {
      onCompare(results);
    }
  };

  return (
    <Card className="p-6">
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Find Available Plans</h3>
          <div className="max-w-xs">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Your ZIP Code
            </label>
            <Input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value.slice(0, 5))}
              placeholder="Enter ZIP Code"
              pattern="[0-9]*"
              maxLength={5}
              className="mb-4"
            />
          </div>
          <Button 
            onClick={handleZipCodeSubmit}
            disabled={zipCode.length !== 5}
          >
            Find Plans
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold mb-4">Select Important Features</h3>
          <div className="space-y-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex items-start gap-2">
                <Checkbox
                  id={feature.name}
                  checked={selectedFeatures.includes(feature.name)}
                  onCheckedChange={() => handleFeatureToggle(feature.name)}
                />
                <div className="grid gap-1.5">
                  <label
                    htmlFor={feature.name}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {feature.name}
                  </label>
                  <p className="text-sm text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button onClick={handleComparison}>
              Compare Plans
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold mb-4">Plan Comparison Results</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4">Plan Name</th>
                  <th className="text-left py-4 px-4">Monthly Premium</th>
                  <th className="text-left py-4 px-4">Annual Deductible</th>
                  <th className="text-left py-4 px-4">Features</th>
                </tr>
              </thead>
              <tbody>
                {compareResults.map((plan) => (
                  <tr key={plan.id} className="border-b border-gray-200">
                    <td className="py-4 px-4">{plan.name}</td>
                    <td className="py-4 px-4">${plan.monthlyPremium}</td>
                    <td className="py-4 px-4">${plan.annualDeductible}</td>
                    <td className="py-4 px-4">
                      <ul className="list-disc list-inside">
                        {Object.entries(plan.features).map(([feature, included]) => (
                          <li key={feature} className={included ? 'text-green-600' : 'text-red-600'}>
                            {feature.charAt(0).toUpperCase() + feature.slice(1)}
                            {included ? ' ✓' : ' ✗'}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setStep(2)}>
              Modify Preferences
            </Button>
            <Button>
              Request More Information
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
