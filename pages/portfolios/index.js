import React, { useState, useEffect } from 'react';
import { withAuth } from '@/middleware/withAuth';
import { financialService } from '@/services/api';
import useFinancialStore from '@/store/financial';
import { formatCurrency } from '@/lib/utils';

// UI Components
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const PortfolioPage = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [newPortfolio, setNewPortfolio] = useState({ name: '', initialInvestment: '' });
  const [isAddingPortfolio, setIsAddingPortfolio] = useState(false);
  const addPortfolioToStore = useFinancialStore((state) => state.addPortfolio);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await financialService.getPortfolios();
        setPortfolios(response.data);
      } catch (error) {
        console.error('Failed to fetch portfolios', error);
      }
    };

    fetchPortfolios();
  }, []);

  const handleAddPortfolio = async (e) => {
    e.preventDefault();
    try {
      const response = await financialService.createPortfolio({
        name: newPortfolio.name,
        initialInvestment: parseFloat(newPortfolio.initialInvestment)
      });

      const createdPortfolio = response.data;
      setPortfolios([...portfolios, createdPortfolio]);
      addPortfolioToStore(createdPortfolio);

      // Reset form
      setNewPortfolio({ name: '', initialInvestment: '' });
      setIsAddingPortfolio(false);
    } catch (error) {
      console.error('Failed to create portfolio', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Portfolios</h1>
        <Button 
          onClick={() => setIsAddingPortfolio(!isAddingPortfolio)}
          variant={isAddingPortfolio ? 'destructive' : 'primary'}
        >
          {isAddingPortfolio ? 'Cancel' : 'Add Portfolio'}
        </Button>
      </div>

      {isAddingPortfolio && (
        <form onSubmit={handleAddPortfolio} className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Name</label>
              <Input
                value={newPortfolio.name}
                onChange={(e) => setNewPortfolio({...newPortfolio, name: e.target.value})}
                placeholder="e.g., Retirement Fund"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Initial Investment</label>
              <Input
                type="number"
                value={newPortfolio.initialInvestment}
                onChange={(e) => setNewPortfolio({...newPortfolio, initialInvestment: e.target.value})}
                placeholder="Enter initial investment"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button type="submit" variant="primary">Create Portfolio</Button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolios.map((portfolio) => (
          <div key={portfolio.id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">{portfolio.name}</h2>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span>Total Value:</span>
                <span className="font-bold">{formatCurrency(portfolio.totalValue)}</span>
              </p>
              <p className="flex justify-between">
                <span>Performance:</span>
                <span className={`font-bold ${portfolio.performance > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {portfolio.performance > 0 ? '+' : ''}{portfolio.performance}%
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Protect the portfolios page
export const getServerSideProps = withAuth();

export default PortfolioPage;