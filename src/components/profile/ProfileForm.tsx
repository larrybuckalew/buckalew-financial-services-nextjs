import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function ProfileForm() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    totalAssets: 0,
    monthlySavings: 0,
    investmentGoals: 0,
    riskTolerance: 'MODERATE'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/dashboard/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    });
    if (res.ok) {
      // Handle success
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Total Assets</label>
        <input
          type="number"
          value={profile.totalAssets}
          onChange={(e) => setProfile({ ...profile, totalAssets: Number(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Monthly Savings</label>
        <input
          type="number"
          value={profile.monthlySavings}
          onChange={(e) => setProfile({ ...profile, monthlySavings: Number(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Investment Goals</label>
        <input
          type="number"
          value={profile.investmentGoals}
          onChange={(e) => setProfile({ ...profile, investmentGoals: Number(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Risk Tolerance</label>
        <select
          value={profile.riskTolerance}
          onChange={(e) => setProfile({ ...profile, riskTolerance: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="LOW">Conservative</option>
          <option value="MODERATE">Moderate</option>
          <option value="HIGH">Aggressive</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
      >
        Save Profile
      </button>
    </form>
  );
}