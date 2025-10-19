import { InsuranceCalculator } from '../insurance-calculator';

describe('InsuranceCalculator', () => {
  describe('Risk Assessment', () => {
    it('should correctly assess low-risk profile', () => {
      const profile = {
        age: 35,
        healthConditions: [],
        lifestyle: [],
        familyHistory: []
      };

      const result = InsuranceCalculator.assessInsuranceRisk(profile);

      expect(result.riskCategory).toBe('low');
      expect(result.recommendations).toContain('Maintain healthy lifestyle');
    });

    it('should correctly assess high-risk profile', () => {
      const profile = {
        age: 55,
        healthConditions: ['Diabetes', 'Hypertension'],
        lifestyle: ['Smoking'],
        familyHistory: ['Early Heart Disease']
      };

      const result = InsuranceCalculator.assessInsuranceRisk(profile);

      expect(result.riskCategory).toBe('high');
      expect(result.recommendations).toContain('Develop comprehensive health management strategy');
    });
  });

  describe('Premium Calculation', () => {
    it('should calculate premium for a standard profile', () => {
      const calculationOptions = {
        age: 40,
        coverage: 500000,
        healthStatus: 'standard' as const,
        additionalRisks: []
      };

      const result = InsuranceCalculator.calculatePremium(calculationOptions);

      expect(result.basePremium).toBeGreaterThan(0);
      expect(result.adjustedPremium).toBeGreaterThan(0);
    });

    it('should adjust premium for high-risk factors', () => {
      const calculationOptions = {
        age: 40,
        coverage: 500000,
        healthStatus: 'substandard' as const,
        additionalRisks: ['Smoking']
      };

      const result = InsuranceCalculator.calculatePremium(calculationOptions);

      expect(result.adjustedPremium).toBeGreaterThan(result.basePremium);
    });
  });

  describe('Insurance Recommendations', () => {
    it('should generate recommendations for a young professional', () => {
      const profile = {
        age: 30,
        income: 75000,
        dependents: 0,
        healthConditions: [],
        lifestyle: [],
        insuranceGoals: ['protection']
      };

      const recommendations = InsuranceCalculator.generateInsuranceRecommendations(profile);

      expect(recommendations.recommendedCoverageTypes).toContain('Term Life');
      expect(recommendations.coverageAmountRange.min).toBeGreaterThan(0);
      expect(recommendations.premiumEstimateRange.min).toBeGreaterThan(0);
    });

    it('should generate recommendations for a family', () => {
      const profile = {
        age: 40,
        income: 120000,
        dependents: 2,
        healthConditions: [],
        lifestyle: [],
        insuranceGoals: ['protection']
      };

      const recommendations = InsuranceCalculator.generateInsuranceRecommendations(profile);

      expect(recommendations.recommendedCoverageTypes).toContain('Family Protection Plan');
      expect(recommendations.coverageAmountRange.max).toBeGreaterThan(recommendations.coverageAmountRange.min);
    });
  });
});
