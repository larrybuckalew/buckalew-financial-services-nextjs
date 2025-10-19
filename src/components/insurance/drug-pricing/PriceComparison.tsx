import React from 'react';

interface DrugPrice {
  pharmacy: string;
  price: number;
}

interface PriceComparisonProps {
  drugName: string;
  prices: DrugPrice[];
}

const PriceComparison: React.FC<PriceComparisonProps> = ({ drugName, prices }) => {
  const sortedPrices = prices.sort((a, b) => a.price - b.price);

  return (
    <div className="max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Price Comparison for {drugName}</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2 text-left">Pharmacy</th>
            <th className="border p-2 text-right">Price</th>
          </tr>
        </thead>
        <tbody>
          {sortedPrices.map((priceInfo, index) => (
            <tr key={index} className={index === 0 ? 'bg-green-100' : ''}>
              <td className="border p-2">{priceInfo.pharmacy}</td>
              <td className="border p-2 text-right">${priceInfo.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PriceComparison;