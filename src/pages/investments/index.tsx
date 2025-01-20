import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../lib/auth';
import prisma from '../../lib/prisma';

// Zod schema for investment validation
import { z } from 'zod';

const InvestmentSchema = z.object({
  type: z.enum(['STOCK', 'BOND', 'CRYPTO', 'REAL_ESTATE'], {
    errorMap: () => ({ message: 'Invalid investment type' })
  }),
  amount: z.number().positive('Investment amount must be positive'),
  date: z.date().max(new Date(), 'Investment date cannot be in the future')
});

interface Investment {
  id: string;
  type: string;
  amount: number;
  date: string;
}

const InvestmentsPage: React.FC<{ investments: Investment[] }> = ({ investments: initialInvestments }) => {
  const [investments, setInvestments] = useState(initialInvestments);
  const [newInvestment, setNewInvestment] = useState({
    type: 'STOCK',
    amount: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewInvestment(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handleAddInvestment = async () => {
    try {
      // Validate input
      const validatedData = InvestmentSchema.parse({
        type: newInvestment.type,
        amount: parseFloat(newInvestment.amount),
        date: new Date(newInvestment.date)
      });

      // Send investment to API
      const response = await fetch('/api/investments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData)
      });

      if (!response.ok) {
        throw new Error('Failed to add investment');
      }

      const addedInvestment = await response.json();

      // Update local state
      setInvestments(prev => [
        ...prev, 
        {
          ...addedInvestment,
          date: new Date(addedInvestment.date).toISOString()
        }
      ]);

      // Reset form
      setNewInvestment({
        type: 'STOCK',
        amount: '',
        date: new Date().toISOString().split('T')[0]
      });
      setError(null);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const handleDeleteInvestment = async (id: string) => {
    try {
      const response = await fetch(`/api/investments/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete investment');
      }

      setInvestments(prev => prev.filter(inv => inv.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Investments</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Add Investment Form */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Investment</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Investment Type</label>
              <select
                name="type"
                value={newInvestment.type}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              >
                <option value="STOCK">Stocks</option>
                <option value="BOND">Bonds</option>
                <option value="CRYPTO">Cryptocurrency</option>
                <option value="REAL_ESTATE">Real Estate</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <input
                type="number"
                name="amount"
                value={newInvestment.amount}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                placeholder="$1,000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={newInvestment.date}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>

            <button
              onClick={handleAddInvestment}
              className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition"
            >
              Add Investment
            </button>
          </div>
        </div>

        {/* Investments List */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Investment History</h2>
          {investments.length === 0 ? (
            <p className="text-gray-500 text-center">No investments yet</p>
          ) : (
            <div className="divide-y divide-gray-200">
              {investments.map((investment) => (
                <div key={investment.id} className="py-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">{investment.type}</p>
                    <p className="text-sm text-gray-600">
                      ${investment.amount.toLocaleString()} - {new Date(investment.date).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteInvestment(investment.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Server-side rendering to fetch initial investments
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  // Fetch user's investments
  const investments = await prisma.investment.findMany({
    where: { userId: session.user.id },
    orderBy: { date: 'desc' }
  });

  return {
    props: {
      investments: investments.map(inv => ({
        ...inv,
        date: inv.date.toISOString()
      }))
    }
  };
};

export default InvestmentsPage;