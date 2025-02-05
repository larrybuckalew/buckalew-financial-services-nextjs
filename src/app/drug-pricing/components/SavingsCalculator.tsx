'use client';

import { useState, useEffect } from 'react';

interface SavingsCalculatorProps {
  currentPrice: number;
  lowestPrice: number;
  quantity: number;
  refills: number;
}

interface SavingsBreakdown {
  perRefill: number;
  annual: number;
  withDiscounts: number;
  withInsurance: number;
}

export function SavingsCalculator({
  currentPrice,
  lowestPrice,
  quantity,
  refills
}: SavingsCalculatorProps) {
  const [savingsBreakdown, setSavingsBreakdown] = useState<SavingsBreakdown>({
    perRefill: 0,
    annual: 0,
    withDiscounts: 0,
    withInsurance: 0
  });

  const [hasInsurance, setHasInsurance] = useState(false);
  const [copayAmount, setCopayAmount] = useState<number>(0);

  useEffect(() => {
    const perRefillSavings = currentPrice - lowestPrice;
    const annualSavings = perRefillSavings * quantity * refills;
    const discountSavings = annualSavings * 1.15; // Assuming additional 15% with discount programs
    const insuranceSavings = hasInsurance && copayAmount > 0 
      ? (currentPrice * quantity * refills) - (copayAmount * refills)
      : 0;

    setSavingsBreakdown({
      perRefill: perRefillSavings,
      annual: annualSavings,
      withDiscounts: discountSavings,
      withInsurance: insuranceSavings
    });
  }, [currentPrice, lowestPrice, quantity, refills, hasInsurance, copayAmount]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Potential Savings Calculator
      </h3>

      {/* Insurance Options */}
      <div className="mb-6">
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={hasInsurance}
            onChange={(e) => setHasInsurance(e.target.checked)}
            className="form-checkbox h-5 w-5 text-primary rounded"
          />
          <span className="ml-2 text-gray-700">I have insurance</span>
        </label>

        {hasInsurance && (
          <div className="ml-7">
            <label className="block text-sm text-gray-600 mb-2">
              Copay Amount ($)
            </label>
            <input
              type="number"
              value={copayAmount}
              onChange={(e) => setCopayAmount(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
              placeholder="Enter your copay amount"
            />
          </div>
        )}
      </div>

      {/* Savings Breakdown */}
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Savings per refill:</span>
            <span className="text-xl font-bold text-primary">
              ${savingsBreakdown.perRefill.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Annual savings:</span>
            <span className="text-xl font-bold text-primary">
              ${savingsBreakdown.annual.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-green-600">With discount programs:</span>
            <span className="text-xl font-bold text-green-600">
              ${savingsBreakdown.withDiscounts.toFixed(2)}
            </span>
          </div>
        </div>

        {hasInsurance && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-blue-600">With insurance:</span>
              <span className="text-xl font-bold text-blue-600">
                ${savingsBreakdown.withInsurance.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Savings Tips */}
      <div className="mt-6">
        <h4 className="font-bold text-gray-900 mb-2">Ways to Save More:</h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            Compare prices at different pharmacies
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            Ask about generic alternatives
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            Join pharmacy discount programs
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            Check manufacturer coupons and assistance programs
          </li>
        </ul>
      </div>
    </div>
  );
}