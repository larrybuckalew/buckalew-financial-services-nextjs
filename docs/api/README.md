# API Documentation

## Overview

This document provides comprehensive documentation for the Financial Services API. The API provides endpoints for various financial calculations, retirement planning, debt management, and more.

## Base URL

```
/api
```

## Authentication

All API endpoints require authentication unless explicitly marked as public. Use the following headers:

```
Authorization: Bearer ${token}
```

## Rate Limiting

API requests are limited to:
- 100 requests per minute per IP
- 1000 requests per hour per user

## Error Handling

All endpoints follow the same error response format:

```json
{
  "success": false,
  "error": {
    "code": string,
    "message": string,
    "details": object (optional)
  }
}
```

Common error codes:
- `AUTH_REQUIRED`: Authentication is required
- `INVALID_INPUT`: Invalid input parameters
- `RATE_LIMIT`: Rate limit exceeded
- `SERVER_ERROR`: Internal server error

## Endpoints

### Retirement Planning

#### Calculate Retirement Projections

```http
POST /api/retirement
```

Calculates detailed retirement projections based on provided inputs.

**Request Body:**
```json
{
  "clientName": "string",
  "inputs": {
    "currentAge": number,
    "retirementAge": number,
    "currentSavings": number,
    "monthlyContribution": number,
    "expectedReturn": number,
    "inflationRate": number,
    "desiredRetirementIncome": number
  },
  "generatePdf": boolean
}
```

**Response:**
```json
{
  "success": true,
  "projections": [
    {
      "age": number,
      "year": number,
      "savingsBalance": number,
      "contributionsThisYear": number,
      "interestEarned": number
    }
  ],
  "pdf": "base64string" // Only if generatePdf is true
}
```

**Error Cases:**
- `INVALID_AGE`: Current age must be less than retirement age
- `INVALID_RATE`: Expected return and inflation rates must be between -20 and 30
- `INVALID_AMOUNT`: Monetary values must be positive numbers

#### Social Security Benefits

```http
POST /api/retirement/social-security
```

Estimates Social Security benefits based on birth year and income history.

**Request Body:**
```json
{
  "birthYear": number,
  "lastYearIncome": number,
  "retirementAge": number
}
```

**Response:**
```json
{
  "success": true,
  "benefits": [
    {
      "retirementAge": number,
      "monthlyBenefit": number,
      "totalBenefitBy90": number
    }
  ]
}
```

### Debt Management

#### Calculate Debt Payoff Strategies

```http
POST /api/debt/payoff-strategies
```

Calculates various debt payoff strategies including avalanche and snowball methods.

**Request Body:**
```json
{
  "debts": [
    {
      "name": string,
      "balance": number,
      "interestRate": number,
      "minimumPayment": number
    }
  ],
  "monthlyPayment": number
}
```

**Response:**
```json
{
  "success": true,
  "strategies": [
    {
      "name": string,
      "description": string,
      "monthlyPayment": number,
      "totalInterest": number,
      "payoffDate": string,
      "schedule": [
        {
          "month": string,
          "remainingBalance": number,
          "interestPaid": number,
          "principalPaid": number
        }
      ]
    }
  ]
}
```

### PDF Generation

#### Generate Financial Report

```http
POST /api/reports/generate
```

Generates a comprehensive financial report in PDF format.

**Request Body:**
```json
{
  "clientName": string,
  "reportType": "retirement" | "debt" | "comprehensive",
  "data": {
    // Report-specific data structure
  }
}
```

**Response:**
```json
{
  "success": true,
  "pdf": "base64string",
  "metadata": {
    "fileName": string,
    "pageCount": number,
    "createdAt": string
  }
}
```

### Data Management

#### Save Financial Profile

```http
POST /api/profiles
```

Saves or updates a client's financial profile.

**Request Body:**
```json
{
  "clientId": string,
  "profile": {
    "personalInfo": {
      "name": string,
      "dateOfBirth": string,
      "email": string
    },
    "financialInfo": {
      "annualIncome": number,
      "retirementAccounts": [
        {
          "type": string,
          "balance": number,
          "contributions": number
        }
      ],
      "debts": [
        {
          "type": string,
          "balance": number,
          "interestRate": number
        }
      ]
    }
  }
}
```

**Response:**
```json
{
  "success": true,
  "profileId": string,
  "lastUpdated": string
}
```

## Webhooks

### Event Types

The API supports webhooks for the following events:
- `report.generated`: When a financial report is generated
- `profile.updated`: When a financial profile is updated
- `calculation.completed`: When a long-running calculation completes

### Webhook Format

```json
{
  "eventType": string,
  "timestamp": string,
  "data": {
    // Event-specific data
  },
  "signature": string
}
```

## Rate Limits & Quotas

### API Tiers

1. Basic Tier
   - 1,000 requests per day
   - Basic calculations only
   - PDF generation limited to 50/month

2. Professional Tier
   - 10,000 requests per day
   - All calculations
   - PDF generation limited to 500/month
   - Webhook support

3. Enterprise Tier
   - Custom limits
   - Priority support
   - Custom calculations
   - Unlimited PDF generation

## Best Practices

1. **Error Handling**
   - Always check for error responses
   - Implement exponential backoff for rate limits
   - Handle timeouts gracefully

2. **Performance**
   - Cache calculation results when possible
   - Use compression for large datasets
   - Implement pagination for large result sets

3. **Security**
   - Always use HTTPS
   - Rotate API keys regularly
   - Validate all input data
   - Store sensitive data securely

## Examples

### Curl Example

```bash
curl -X POST https://api.example.com/api/retirement \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "clientName": "John Doe",
    "inputs": {
      "currentAge": 30,
      "retirementAge": 65,
      "currentSavings": 50000,
      "monthlyContribution": 1000,
      "expectedReturn": 7,
      "inflationRate": 2,
      "desiredRetirementIncome": 80000
    }
  }'
```

### Python Example

```python
import requests

API_URL = "https://api.example.com/api"
API_KEY = "YOUR_API_KEY"

def calculate_retirement(client_name, inputs):
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    
    response = requests.post(
        f"{API_URL}/retirement",
        headers=headers,
        json={
            "clientName": client_name,
            "inputs": inputs
        }
    )
    
    return response.json()
```

## Support

For API support, please contact:
- Email: api-support@example.com
- Documentation: https://docs.example.com
- Status Page: https://status.example.com