import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { formatCurrency } from '@/lib/utils';

const FinancialSummaryCard = ({ 
  totalAssets, 
  totalLiabilities, 
  netWorth, 
  className 
}) => {
  const assetColor = netWorth >= 0 ? 'text-green-600' : 'text-red-600';

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Financial Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Total Assets</p>
            <p className="text-xl font-bold text-blue-600">
              {formatCurrency(totalAssets)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Total Liabilities</p>
            <p className="text-xl font-bold text-red-600">
              {formatCurrency(totalLiabilities)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Net Worth</p>
            <p className={`text-xl font-bold ${assetColor}`}>
              {formatCurrency(netWorth)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialSummaryCard;