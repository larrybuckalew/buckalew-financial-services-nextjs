import { create } from 'zustand';

const useFinancialStore = create((set) => ({
  portfolios: [],
  transactions: [],
  investmentSummary: null,

  addPortfolio: (portfolio) => set((state) => ({
    portfolios: [...state.portfolios, portfolio]
  })),

  updatePortfolio: (portfolioId, updatedData) => set((state) => ({
    portfolios: state.portfolios.map(portfolio => 
      portfolio.id === portfolioId ? { ...portfolio, ...updatedData } : portfolio
    )
  })),

  addTransaction: (transaction) => set((state) => ({
    transactions: [...state.transactions, transaction]
  })),

  setInvestmentSummary: (summary) => set({
    investmentSummary: summary
  })
}));

export default useFinancialStore;