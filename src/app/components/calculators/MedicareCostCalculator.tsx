'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Input } from './shared/Input';
import { ChartSection } from './shared/ChartSection';
import { ExportButton } from './shared/ExportButton';

interface MedicareCosts {
  year: number;
  partA: number;
  partB: number;
  partD: number;
  medigap: number;
  total: number;
}

const MedicareCostCalculator: React.FC = () => {
  // Income-based premium adjustments (IRMAA)
  const [yearlyIncome, setYearlyIncome] = useState(85000);
  const [filingStatus, setFilingStatus] = useState('single');
  
  // Part A
  const [hasPartACharge, setHasPartACharge] = useState(false);
  const [partADeductible] = useState(1600);
  const [estimatedHospitalDays, setEstimatedHospitalDays] = useState(0);
  
  // Part B
  const [partBPremium] = useState(164.90);
  const [partBDeductible] = useState(240);
  const [estimatedDoctorVisits, setEstimatedDoctorVisits] = useState(4);
  
  // Part D
  const [partDPremium] = useState(32.74);
  const [partDDeductible] = useState(505);
  const [estimatedDrugCosts, setEstimatedDrugCosts] = useState(200);
  
  // Medigap
  const [medigapPlan, setMedigapPlan] = useState('G');
  const [medigapPremium, setMedigapPremium] = useState(150);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [projectedCosts, setProjectedCosts] = useState<MedicareCosts[]>([]);

  // Calculate IRMAA adjustments based on income
  const calculateIRMAA = useCallback(() => {
    let partBadjustment = 0;
    let partDadjustment = 0;

    if (filingStatus === 'single') {
      if (yearlyIncome > 97000) partBadjustment = 64.70;
      if (yearlyIncome > 123000) partBadjustment = 161.80;
      if (yearlyIncome > 153000) partBadjustment = 258.90;
      if (yearlyIncome > 183000) partBadjustment = 356.00;
      if (yearlyIncome > 500000) partBadjustment = 386.10;

      if (yearlyIncome > 97000) partDadjustment = 12.20;
      if (yearlyIncome > 123000) partDadjustment = 31.50;
      if (yearlyIncome > 153000) partDadjustment = 50.70;
      if (yearlyIncome > 183000) partDadjustment = 70.00;
      if (yearlyIncome > 500000) partDadjustment = 76.40;
    } else {
      if (yearlyIncome > 194000) partBadjustment = 64.70;
      if (yearlyIncome > 246000) partBadjustment = 161.80;
      if (yearlyIncome > 306000) partBadjustment = 258.90;
      if (yearlyIncome > 366000) partBadjustment = 356.00;
      if (yearlyIncome > 750000) partBadjustment = 386.10;

      if (yearlyIncome > 194000) partDadjustment = 12.20;
      if (yearlyIncome > 246000) partDadjustment = 31.50;
      if (yearlyIncome > 306000) partDadjustment = 50.70;
      if (yearlyIncome > 366000) partDadjustment = 70.00;
      if (yearlyIncome > 750000) partDadjustment = 76.40;
    }

    return { partBadjustment, partDadjustment };
  }, [yearlyIncome, filingStatus]);

  const validateInputs = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (yearlyIncome < 0) {
      newErrors.yearlyIncome = 'Income cannot be negative';
    }
    if (estimatedHospitalDays < 0) {
      newErrors.estimatedHospitalDays = 'Days cannot be negative';
    }
    if (estimatedDoctorVisits < 0) {
      newErrors.estimatedDoctorVisits = 'Visits cannot be negative';
    }
    if (estimatedDrugCosts < 0) {
      newErrors.estimatedDrugCosts = 'Costs cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [yearlyIncome, estimatedHospitalDays, estimatedDoctorVisits, estimatedDrugCosts]);

  const calculateCosts = useCallback(() => {
    if (!validateInputs()) return;

    const { partBadjustment, partDadjustment } = calculateIRMAA();
    const projections: MedicareCosts[] = [];

    for (let year = 0; year < 5; year++) {
      const inflationFactor = Math.pow(1.03, year);

      const partACost = hasPartACharge ? 
        ((partADeductible + (estimatedHospitalDays * 400)) * inflationFactor) : 0;

      const annualPartBPremium = ((partBPremium + partBadjustment) * 12) * inflationFactor;
      const partBCost = annualPartBPremium + 
        (partBDeductible + (estimatedDoctorVisits * 50)) * inflationFactor;

      const annualPartDPremium = ((partDPremium + partDadjustment) * 12) * inflationFactor;
      const partDCost = annualPartDPremium + 
        (partDDeductible + (estimatedDrugCosts * 12)) * inflationFactor;

      const medigapCost = (medigapPremium * 12) * inflationFactor;

      const totalCost = partACost + partBCost + partDCost + medigapCost;

      projections.push({
        year: new Date().getFullYear() + year,
        partA: Math.round(partACost),
        partB: Math.round(partBCost),
        partD: Math.round(partDCost),
        medigap: Math.round(medigapCost),
        total: Math.round(totalCost)
      });
    }

    setProjectedCosts(projections);
  }, [
    calculateIRMAA, validateInputs, hasPartACharge, partADeductible, 
    estimatedHospitalDays, partBPremium, partBDeductible, estimatedDoctorVisits,
    partDPremium, partDDeductible, estimatedDrugCosts, medigapPremium
  ]);

  useEffect(() => {
    calculateCosts();
  }, [calculateCosts]);

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
        {/* Left Column - Inputs */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Income & Filing Status</h3>
          <Input
            label="Yearly Income"
            value={yearlyIncome}
            onChange={setYearlyIncome}
            error={errors.yearlyIncome}
            min={0}
            step={1000}
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Filing Status</label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="single">Single</option>
              <option value="joint">Married Filing Jointly</option>
            </select>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Medicare Part A</h3>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={hasPartACharge}
                onChange={(e) => setHasPartACharge(e.target.checked)}
                className="h-4 w-4 text-blue-600"
              />
              <label className="ml-2 text-sm text-gray-700">
                Premium charge for Part A
              </label>
            </div>
            <Input
              label="Estimated Hospital Days"
              value={estimatedHospitalDays}
              onChange={setEstimatedHospitalDays}
              error={errors.estimatedHospitalDays}
              min={0}
            />
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Medicare Part B</h3>
            <Input
              label="Estimated Doctor Visits"
              value={estimatedDoctorVisits}
              onChange={setEstimatedDoctorVisits}
              error={errors.estimatedDoctorVisits}
              min={0}
            />
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Medicare Part D</h3>
            <Input
              label="Monthly Drug Costs"
              value={estimatedDrugCosts}
              onChange={setEstimatedDrugCosts}
              error={errors.estimatedDrugCosts}
              min={0}
            />
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Medigap Plan</h3>
            <select
              value={medigapPlan}
              onChange={(e) => setMedigapPlan(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {['A', 'B', 'C', 'D', 'F', 'G', 'K', 'L', 'M', 'N'].map(plan => (
                <option key={plan} value={plan}>Plan {plan}</option>
              ))}
            </select>
            <Input
              label="Monthly Premium"
              value={medigapPremium}
              onChange={setMedigapPremium}
              min={0}
              className="mt-4"
            />
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Cost Summary</h3>
            {projectedCosts.length > 0 && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">First Year Total Cost</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(projectedCosts[0].total)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Part A</p>
                    <p className="text-lg font-semibold">
                      {formatCurrency(projectedCosts[0].partA)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Part B</p>
                    <p className="text-lg font-semibold">
                      {formatCurrency(projectedCosts[0].partB)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Part D</p>
                    <p className="text-lg font-semibold">
                      {formatCurrency(projectedCosts[0].partD)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Medigap</p>
                    <p className="text-lg font-semibold">
                      {formatCurrency(projectedCosts[0].medigap)}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-600">Monthly Cost</p>
                  <p className="text-xl font-semibold text-blue-600">
                    {formatCurrency(projectedCosts[0].total / 12)}
                  </p>
                </div>

                {yearlyIncome > 97000 && (
                  <div className="mt-4 bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      Note: Your income may subject you to additional IRMAA charges
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {projectedCosts.length > 0 && (
            <>
              <ChartSection
                data={projectedCosts}
                type="bar"
                dataKey="total"
                xAxisKey="year"
                title="Total Cost by Year"
                yAxisLabel="Cost"
                height={300}
              />

              <ChartSection
                data={projectedCosts}
                type="bar"
                dataKey="total"
                xAxisKey="year"
                title="Cost Breakdown"
                yAxisLabel="Cost"
                height={300}
                compareKeys={['partA', 'partB', 'partD', 'medigap']}
                colors={['#ef4444', '#3b82f6', '#10b981', '#8b5cf6']}
              />

              <div className="mt-4">
                <ExportButton
                  data={projectedCosts}
                  filename="medicare-cost-projection"
                  type="csv"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicareCostCalculator;