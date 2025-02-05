export class NetworkError extends Error {
  constructor(message = 'Network connection issue. Please check your internet connection.') {
    super(message);
    this.name = 'NetworkError';
  }
}

export class ValidationError extends Error {
  constructor(message = 'Invalid input data provided.') {
    super(message);
    this.name = 'ValidationError';
  }
}

export class APIError extends Error {
  status: number;
  
  constructor(message = 'API request failed.', status = 500) {
    super(message);
    this.name = 'APIError';
    this.status = status;
  }
}

export class RateLimitError extends Error {
  retryAfter: number;
  
  constructor(message = 'Too many requests. Please try again later.', retryAfter = 60) {
    super(message);
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
  }
}

export class PharmacyNotFoundError extends Error {
  constructor(message = 'No pharmacies found in your area.') {
    super(message);
    this.name = 'PharmacyNotFoundError';
  }
}

export class DrugNotFoundError extends Error {
  suggestions?: string[];
  
  constructor(message = 'Medication not found.', suggestions?: string[]) {
    super(message);
    this.name = 'DrugNotFoundError';
    this.suggestions = suggestions;
  }
}