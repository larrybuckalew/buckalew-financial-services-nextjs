import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

// Simulated real-time data service (replace with actual API)
const fetchMarketData = async () => {
  // In a real-world scenario, this would be an API call
  return {
    stocks: [
      { symbol: 'AAPL', price: 175.23, change: 2.34, changePercent: 1.35 },
      { symbol: 'GOOGL', price: 125.67, change: -1.22, changePercent: -0.97 },
      { symbol: 'MSFT', price: 335.44, change: 3.11, changePercent: 0.93 }
    ],
    indices: [
      { name: 'S&P 500', value: 4392.59, change: 23.45, changePercent: 0.54 },
      { name: 'NASDAQ', value: 13675.77, change: 12.33, changePercent: 0.09 }
    ],
    currencies: [
      { symbol: 'EUR/USD', rate: 1.0721, change: 0.0023, changePercent: 0.21 },
      { symbol: 'BTC/USD', rate: 42567.89, change: 345.67, changePercent: 0.82 }
    ]
  };
};

const MarketDataWidget = () => {
  const [marketData, setMarketData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMarketData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMarketData();
        setMarketData(data);
      } catch (error) {
        console.error('Failed to fetch market data', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Initial load
    loadMarketData();

    // Periodic updates
    const intervalId = setInterval(loadMarketData, 60000); // Update every minute

    // Cleanup
    return () => clearInterval(intervalId);
  }, []);

  const renderMarketSection = (title, data) => {
    if (isLoading) {
      return <div className="text-center text-gray-500">Loading...</div>;
    }

    return (
      <div>
        <h3 className="text-lg font-semibold mb-3">{title}</h3>
        <div className="space-y-2">
          {data.map((item, index) => (
            <motion.div
              key={item.symbol || item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex justify-between items-center"
            >
              <span className="font-medium">{item.symbol || item.name}</span>
              <div className="flex items-center">
                <span className="mr-2 font-bold">
                  {item.price || item.value || item.rate}
                </span>
                <span className={`
                  ml-2 px-2 py-1 rounded text-xs
                  ${item.changePercent >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                `}>
                  {item.changePercent.toFixed(2)}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Real-time Market Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-6">
          <div>
            {renderMarketSection('Top Stocks', marketData?.stocks || [])}
          </div>
          <div>
            {renderMarketSection('Market Indices', marketData?.indices || [])}
          </div>
          <div>
            {renderMarketSection('Currencies', marketData?.currencies || [])}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketDataWidget;