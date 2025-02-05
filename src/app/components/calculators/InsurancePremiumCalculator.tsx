'use client';

import React, { useState, useCallback } from 'react';
import { Input } from './shared/Input';
import { ChartSection } from './shared/ChartSection';
import { ExportButton } from './shared/ExportButton';

interface PlanComparison {
  name: string;
  monthlyPremium: number;
  annualPremium: number;
  deductible: number;
  outOfPocketMax: number;
  totalPotentialCost: number;
  estimatedAnnualCost: number;
}

const InsurancePremiumCalculator: React.FC = () => {
  // Personal Information
  const [age, setAge] = useState(65);
  const [tobacco, setTobacco] = useState(false);
  const [zip, setZip] = useState('');
  
  // Healthcare Usage
  const [expectedDoctorVisits, setExpectedDoctorVisits] = useState(4);
  const [expectedPrescriptions, setExpectedPrescriptions] = useState(2);
  const [chronicConditions, setChronicConditions] = useState(false);
  
  // Plan Details (up to 3 plans to compare)
  const [plans, setPlans] = useState<PlanComparison[]>([
    {
      name: 'Basic Plan',
      monthlyPremium: 0,
      annualPremium: 0,
      deductible: 0,
      outOfPocketMax: 0,
      totalPotentialCost: 0,
      estimatedAnnualCost: 0
    }
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Add a new plan to compare
  const addPlan = () => {
    if (plans.length < 3) {
      setPlans([...plans, {
        name: `Plan ${plans.length + 1}`,
        monthlyPremium: 0,
        annualPremium: 0,
        deductible: 0,
        outOfPocketMax: 0,
        totalPotentialCost: 0,
        estimatedAnnualCost: 0
      }]);
    }
  };

  // Remove a plan
  const removePlan = (index: number) => {
    const newPlans = plans.filter((_, i) => i !== index);
    setPlans(newPlans);
  };

  // Update plan details
  const updatePlan = (index: number, field: keyof PlanComparison, value: number | string) => {
    const newPlans = [...plans];
    newPlans[index] = {
      ...newPlans[index],
      [field]: value
    };
    
    // Recalculate derived values
    if (field === 'monthlyPremium') {
      newPlans[index].annualPremium = (value as number) * 12;
    }
    
    // Calculate total potential cost
    newPlans[index].totalPotentialCost = 
      newPlans[index].annualPremium + newPlans[index].outOfPocketMax;
    
    // Estimate annual cost based on usage
    const estimatedClaims = 
      (expectedDoctorVisits * 150) + // Average doctor visit cost
      (expectedPrescriptions * 50 * 12) + // Monthly prescription costs
      (chronicConditions ? 2000 : 0); // Additional costs for chronic conditions
    
    let estimatedAnnualCost = newPlans[index].annualPremium;
    
    if (estimatedClaims > newPlans[index].deductible) {
      // Add 20% of claims above deductible, up to out-of-pocket max
      const claimsAboveDeductible = estimatedClaims - newPlans[index].deductible;
      const coinsurance = Math.min(
        claimsAboveDeductible * 0.2,
        newPlans[index].outOfPocketMax - newPlans[index].deductible
      );
      estimatedAnnualCost += newPlans[index].deductible + coinsurance;
    } else {
      estimatedAnnualCost += estimatedClaims;
    }
    
    newPlans[index].estimatedAnnualCost = estimatedAnnualCost;
    
    setPlans(newPlans);
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Age"
              value={age}
              onChange={setAge}
              error={errors.age}
              min={0}
              max={120}
            />
            <Input
              label="ZIP Code"
              value={zip}
              onChange={(value) => setZip(value.toString())}
              error={errors.zip}
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={tobacco}
              onChange={(e) => setTobacco(e.target.checked)}
              className="h-4 w-4 text-blue-600"
            />
            <label className="text-sm text-gray-700">
              Tobacco user
            </label>
          </div>

          <h3 className="text-lg font-semibold mt-6">Expected Healthcare Usage</h3>
          <Input
            label="Doctor Visits per Year"
            value={expectedDoctorVisits}
            onChange={setExpectedDoctorVisits}
            error={errors.expectedDoctorVisits}
            min={0}
          />
          <Input
            label="Prescriptions per Month"
            value={expectedPrescriptions}
            onChange={setExpectedPrescriptions}
            error={errors.expectedPrescriptions}
            min={0}
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={chronicConditions}
              onChange={(e) => setChronicConditions(e.target.checked)}
              className="h-4 w-4 text-blue-600"
            />
            <label className="text-sm text-gray-700">
              Managing chronic conditions
            </label>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Plan Details</h3>
            {plans.length < 3 && (
              <button
                onClick={addPlan}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                + Add Plan to Compare
              </button>
            )}
          </div>

          {plans.map((plan, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <Input
                  label="Plan Name"
                  value={plan.name}
                  onChange={(value) => updatePlan(index, 'name', value.toString())}
                  error={errors[`plan-${index}-name`]}
                />
                {index > 0 && (
                  <button
                    onClick={() => removePlan(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Monthly Premium"
                  value={plan.monthlyPremium}
                  onChange={(value) => updatePlan(index, 'monthlyPremium', value)}
                  error={errors[`plan-${index}-premium`]}
                  min={0}
                  step={1}
                />
                <Input
                  label="Annual Deductible"
                  value={plan.deductible}
                  onChange={(value) => updatePlan(index, 'deductible', value)}
                  error={errors[`plan-${index}-deductible`]}
                  min={0}
                  step={100}
                />
                <Input
                  label="Out-of-Pocket Maximum"
                  value={plan.outOfPocketMax}
                  onChange={(value) => updatePlan(index, 'outOfPocketMax', value)}
                  error={errors[`plan-${index}-oop`]}
                  min={0}
                  step={100}
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 bg-blue-50 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Estimated Annual Cost</p>
                  <p className="text-lg font-semibold text-blue-700">
                    {formatCurrency(plan.estimatedAnnualCost)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Maximum Potential Cost</p>
                  <p className="text-lg font-semibold text-red-600">
                    {formatCurrency(plan.totalPotentialCost)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {plans.length > 1 && (
        <>
          <ChartSection
            data={plans}
            type="bar"
            dataKey="estimatedAnnualCost"
            xAxisKey="name"
            title="Estimated Annual Cost Comparison"
            yAxisLabel="Cost"
            height={300}
          />

          <ChartSection
            data={plans}
            type="bar"
            dataKey="totalPotentialCost"
            xAxisKey="name"
            title="Maximum Potential Cost Comparison"
            yAxisLabel="Cost"
            height={300}
          />

          <ChartSection
            data={plans.map(plan => ({
              name: plan.name,
              premium: plan.annualPremium,
              deductible: plan.deductible,
              remainder: plan.outOfPocketMax - plan.deductible
            }))}
            type="bar"
            dataKey="name"
            xAxisKey="name"
            title="Cost Breakdown Comparison"
            yAxisLabel="Cost"
            height={300}
            compareKeys={['premium', 'deductible', 'remainder']}
            colors={['#3b82f6', '#ef4444', '#10b981']}
          />

          <div className="mt-6">
            <ExportButton
              data={plans}
              filename="insurance-plan-comparison"
              type="csv"
            />
          </div>
        </>
      )}

      <div className="mt-6 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-blue-800 mb-4">Understanding Your Comparison</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Estimated Annual Cost</h4>
            <p className="text-gray-700 text-sm">
              Based on your expected healthcare usage, including:
              <ul className="list-disc ml-4 mt-2">
                <li>Monthly premiums</li>
                <li>{expectedDoctorVisits} doctor visits per year</li>
                <li>{expectedPrescriptions} monthly prescriptions</li>
                {chronicConditions && <li>Chronic condition management</li>}
              </ul>
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Maximum Potential Cost</h4>
            <p className="text-gray-700 text-sm">
              The most you could pay in a year, including:
              <ul className="list-disc ml-4 mt-2">
                <li>Annual premiums</li>
                <li>Deductible</li>
                <li>Out-of-pocket maximum</li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsurancePremiumCalculator;