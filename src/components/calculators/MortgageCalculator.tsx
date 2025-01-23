import React from 'react';

interface MortgageCalculatorProps {
  principal: number;
  interestRate: number;
  loanTerm: number;
}

const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({
  principal,
  interestRate,
  loanTerm
}) => {
  const calculateMonthlyPayment = () => {
    return (principal * interestRate) / (loanTerm * 12);
  };

  const monthlyPayment = calculateMonthlyPayment();

  return (
    <div>
      <h2>Mortgage Calculator</h2>
      <p>Monthly Payment: </p>
    </div>
  );
};

export default MortgageCalculator;
