import axios from 'axios';
import useAuthStore from '../store/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for adding token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Logout user if token is invalid
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

// Authentication endpoints
export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', userData),
  resetPassword: (email) => api.post('/auth/reset-password', { email })
};

// Financial endpoints
export const financialService = {
  getPortfolios: () => api.get('/portfolios'),
  createPortfolio: (portfolioData) => api.post('/portfolios', portfolioData),
  getTransactions: () => api.get('/transactions'),
  addTransaction: (transactionData) => api.post('/transactions', transactionData)
};

export default api;