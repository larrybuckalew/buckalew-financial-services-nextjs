"use client"

import { useState } from "react"

export function RetirementCalculator() {
  const [formData, setFormData] = useState({
    currentAge: 30,
    retirementAge: 65,
    currentSavings: 50000,
    monthlyContribution: 1000,
    expectedReturn: 7,
  })

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Current Age</label>
          <input
            type="number"
            value={formData.currentAge}
            onChange={(e) => setFormData(prev => ({ ...prev, currentAge: +e.target.value }))}
            className="mt-1 block w-full rounded-md border p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Retirement Age</label>
          <input
            type="number"
            value={formData.retirementAge}
            onChange={(e) => setFormData(prev => ({ ...prev, retirementAge: +e.target.value }))}
            className="mt-1 block w-full rounded-md border p-2"
          />
        </div>
      </div>
      <button className="w-full rounded bg-blue-600 py-2 text-white">Calculate</button>
    </div>
  )
}
