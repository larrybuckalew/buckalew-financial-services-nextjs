import axios from 'axios';
import ErrorHandler from '@/lib/error-handling/global-error-handler';

class FinancialService {
  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Interceptors for error handling and token management
    this.client.interceptors.request.use(
      config => {
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      response => response,
      error => {
        const processedError = ErrorHandler.handleApiError(error);
        return Promise.reject(processedError);
      }
    );
  }

  // Token management
  getAuthToken() {
    return typeof window !== 'undefined' 
      ? localStorage.getItem('auth_token') 
      : null;
  }

  // Portfolio Operations
  async getPortfolios() {
    try {
      const response = await this.client.get('/portfolios');
      return response.data;
    } catch (error) {
      ErrorHandler.log(error, { method: 'getPortfolios' });
      throw error;
    }

  async createPortfolio(portfolioData) {
    return this.client.post('/portfolios', portfolioData);
  }

  async updatePortfolio(portfolioId, portfolioData) {
    return this.client.put(`/portfolios/${portfolioId}`, portfolioData);
  }

  // Transaction Operations
  async getTransactions(filters = {}) {
    return this.client.get('/transactions', { params: filters });
  }

  async addTransaction(transactionData) {
    return this.client.post('/transactions', transactionData);
  }

  // Advanced Financial Analysis
  async getPredictiveAnalysis(portfolioId) {
    return this.client.get(`/portfolios/${portfolioId}/predictions`);
  }

  async getRiskAssessment(portfolioId) {
    return this.client.get(`/portfolios/${portfolioId}/risk`);
  }

  // Real-time Market Data
  async getMarketData(symbols = []) {
    return this.client.get('/market-data', { 
      params: { symbols: symbols.join(',') } 
    });
  }

  // Personalized Recommendations
  async getPersonalizedRecommendations() {
    return this.client.get('/recommendations');
  }
}

export default new FinancialService();