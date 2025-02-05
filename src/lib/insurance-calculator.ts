export interface EligibilityCriteria {
  age: { min: number; max: number };
  healthConditions?: string[];
  income?: { min?: number; max?: number };
}

export interface PremiumCalculationOptions {
  age: number;
  coverage: number;
  healthStatus: 'preferred' | 'standard' | 'substandard';
  additionalRisks?: string[];
}

export class InsuranceCalculator {
  // Previous methods remain the same...

  // Risk Assessment Scoring (continued)
  static assessInsuranceRisk(
    profile: {
      age: number;
      healthConditions?: string[];
      lifestyle?: string[];
      familyHistory?: string[];
    }
  ): {
    riskScore: number;
    riskCategory: 'low' | 'medium' | 'high';
    recommendations: string[];
  } {
    let riskScore = 0;

    // Age Risk
    riskScore += profile.age < 35 ? -10 : 
                 profile.age < 50 ? 0 : 
                 profile.age < 65 ? 10 : 20;

    // Health Conditions Risk
    const severityMap: Record<string, number> = {
      'Diabetes': 15,
      'Hypertension': 10,
      'Heart Disease': 25,
      'Cancer History': 30
    };

    profile.healthConditions?.forEach(condition => {
      riskScore += severityMap[condition] || 5;
    });

    // Lifestyle Risk
    const lifestyleRisks: Record<string, number> = {
      'Smoking': 20,
      'Heavy Alcohol': 15,
      'Extreme Sports': 10
    };

    profile.lifestyle?.forEach(risk => {
      riskScore += lifestyleRisks[risk] || 0;
    });

    // Family History
    const familyHistoryRisks: Record<string, number> = {
      'Early Heart Disease': 15,
      'Genetic Disorders': 20
    };

    profile.familyHistory?.forEach(risk => {
      riskScore += familyHistoryRisks[risk] || 0;
    });

    const riskCategory = 
      riskScore < 20 ? 'low' : 
      riskScore < 40 ? 'medium' : 
      'high';

    const recommendations = {
      low: [
        'Consider comprehensive coverage',
        'Explore premium discount options',
        'Maintain healthy lifestyle',
        'Regular preventive health check-ups'
      ],
      medium: [
        'Consider additional health screenings',
        'Look into supplemental insurance',
        'Develop health improvement plan',
        'Explore flexible coverage options'
      ],
      high: [
        'Consult with insurance specialist',
        'Consider specialized high-risk insurance',
        'Develop comprehensive health management strategy',
        'Explore guaranteed issue life insurance options'
      ]
    };

    return {
      riskScore,
      riskCategory,
      recommendations: recommendations[riskCategory]
    };
  }

  // Comprehensive Insurance Recommendation Engine
  static generateInsuranceRecommendations(
    profile: {
      age: number;
      income: number;
      dependents: number;
      healthConditions?: string[];
      lifestyle?: string[];
      insuranceGoals: string[];
    }
  ): {
    recommendedCoverageTypes: string[];
    coverageAmountRange: { min: number; max: number };
    premiumEstimateRange: { min: number; max: number };
    keyConsiderations: string[];
  } {
    const riskAssessment = this.assessInsuranceRisk({
      age: profile.age,
      healthConditions: profile.healthConditions,
      lifestyle: profile.lifestyle
    });

    // Base coverage calculation
    const baseCoverage = profile.income * 10 * (1 + (profile.dependents * 0.5));
    
    // Recommended coverage types
    const recommendedCoverageTypes = [
      ...(profile.age < 40 ? ['Term Life'] : []),
      ...(profile.age >= 40 ? ['Whole Life', 'Universal Life'] : []),
      ...(profile.dependents > 2 ? ['Family Protection Plan'] : []),
      ...(profile.healthConditions ? ['Critical Illness Coverage'] : [])
    ];

    // Coverage amount range
    const coverageAmountRange = {
      min: baseCoverage * 0.8,
      max: baseCoverage * 1.5
    };

    // Premium estimate range based on risk category
    const premiumMultipliers = {
      low: { min: 0.7, max: 1 },
      medium: { min: 1, max: 1.5 },
      high: { min: 1.5, max: 2.5 }
    };

    const premiumEstimateRange = {
      min: baseCoverage * 0.05 * premiumMultipliers[riskAssessment.riskCategory].min,
      max: baseCoverage * 0.05 * premiumMultipliers[riskAssessment.riskCategory].max
    };

    // Key considerations based on profile
    const keyConsiderations = [
      ...(profile.insuranceGoals.includes('wealth-building') 
        ? ['Consider investment-linked insurance products'] 
        : []),
      ...(profile.dependents > 0 
        ? ['Prioritize stable, long-term coverage'] 
        : ['Explore flexible, cost-effective options']),
      ...riskAssessment.recommendations
    ];

    return {
      recommendedCoverageTypes,
      coverageAmountRange,
      premiumEstimateRange,
      keyConsiderations
    };
  }
}

// Export types for use in other parts of the application
export type {
  EligibilityCriteria,
  PremiumCalculationOptions
};
