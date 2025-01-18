import React from 'react';

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Financial Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Account Summary</h2>
          <p className="text-gray-600">Total Balance: $250,000</p>
          <p className="text-gray-600">Net Worth: $500,000</p>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <ul>
            <li className="border-b py-2">Investment Deposit: $5,000</li>
            <li className="border-b py-2">Monthly Savings: $1,500</li>
            <li className="border-b py-2">Bill Payment: $750</li>
          </ul>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Financial Goals</h2>
          <div className="mb-4">
            <p className="text-gray-600">Retirement Savings</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '65%'}}></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">65% Complete</p>
          </div>
        </div>
      </div>
    </div>
  );
}