function evaluateSpecialistCoverage(plan: InsurancePlan) {
  let score = 0;
  let isGood = false;

  const hasGoodSpecialistCoverage = plan.features.some(feature =>
    feature.toLowerCase().includes('specialist')
  );

  if (hasGoodSpecialistCoverage) {
    score += 15;
    isGood = true;
  }

  if (plan.networkSize === 'Large') {
    score += 10;
    isGood = true;
  }

  return { score, isGood };
}

function evaluateFamilyCoverage(plan: InsurancePlan) {
  let score = 0;
  let isGood = false;

  const hasFamilyBenefits = plan.features.some(feature =>
    feature.toLowerCase().includes('family')
  );

  if (hasFamilyBenefits) {
    score += 20;
    isGood = true;
  }

  if (plan.outOfPocketMax < 12000) {
    score += 10;
    isGood = true;
  }

  return { score, isGood };
}

function calculatePlanAffordability(plan: InsurancePlan, monthlyBudget: number) {
  let score = 0;
  const concerns: string[] = [];

  if (plan.monthlyPremium <= monthlyBudget * 0.8) {
    score += 20; // Well within budget
  } else if (plan.monthlyPremium <= monthlyBudget) {
    score += 10; // Within budget but close to limit
    concerns.push('Close to budget limit');
  } else {
    score -= 10; // Over budget
    const overagePercent = ((plan.monthlyPremium - monthlyBudget) / monthlyBudget) * 100;
    concerns.push(`${Math.round(overagePercent)}% over budget`);
  }

  return { score, concerns };
}

export function recommendPlans(
  preferences: UserPreferences,
  availablePlans: InsurancePlan[]
): PlanScore[] {
  return availablePlans.map(plan => {
    let score = 0;
    const matchingFactors: string[] = [];
    const concerns: string[] = [];

    // Budget Analysis
    const affordability = calculatePlanAffordability(plan, preferences.monthlyBudget);
    score += affordability.score;
    concerns.push(...affordability.concerns);

    // Prescription Coverage
    const prescriptionScore = evaluatePrescriptionCoverage(
      preferences.prescriptionNeeds,
      plan.prescriptionCoverage
    );
    score += prescriptionScore.score;
    if (prescriptionScore.isGood) {
      matchingFactors.push('Good prescription coverage');
    } else {
      concerns.push('Limited prescription coverage');
    }

    // Network Analysis
    const networkScore = evaluateNetwork(
      preferences.preferredProviders,
      preferences.preferredHospitals,
      plan
    );
    score += networkScore.score;
    if (networkScore.providersInNetwork) {
      matchingFactors.push('Preferred providers in network');
    }
    if (networkScore.hospitalsInNetwork) {
      matchingFactors.push('Preferred hospitals in network');
    }

    // Pre-existing Conditions
    if (preferences.preExistingConditions) {
      const preExistingScore = evaluatePreExistingConditionsCoverage(plan);
      score += preExistingScore.score;
      if (preExistingScore.isGood) {
        matchingFactors.push('Good coverage for pre-existing conditions');
      } else {
        concerns.push('Limited coverage for pre-existing conditions');
      }
    }

    // Primary Care Analysis
    const primaryCareScore = evaluatePrimaryCare(
      preferences.primaryCareFrequency,
      plan
    );
    score += primaryCareScore.score;
    if (primaryCareScore.isGood) {
      matchingFactors.push('Matches primary care needs');
    }

    // Specialist Coverage
    if (preferences.specialistNeeds) {
      const specialistScore = evaluateSpecialistCoverage(plan);
      score += specialistScore.score;
      if (specialistScore.isGood) {
        matchingFactors.push('Good specialist coverage');
      } else {
        concerns.push('Limited specialist coverage');
      }
    }

    // Family Coverage
    if (preferences.familyCoverage) {
      const familyScore = evaluateFamilyCoverage(plan);
      score += familyScore.score;
      if (familyScore.isGood) {
        matchingFactors.push('Good family coverage');
      } else {
        concerns.push('Limited family benefits');
      }
    }

    // Adjust score based on plan rating
    score += plan.rating * 5;

    return {
      plan,
      score,
      matchingFactors,
      concerns,
      matchPercentage: Math.min(Math.round((score / 100) * 100), 100)
    };
  }).sort((a, b) => b.score - a.score);
}

// Additional utility functions for plan analysis
export function analyzeAnnualCosts(
  plan: InsurancePlan,
  expectedVisits: number,
  expectedPrescriptions: number
) {
  const annualPremium = plan.monthlyPremium * 12;
  const estimatedVisitCosts = Math.min(
    expectedVisits * 100,
    plan.annualDeductible
  );
  const estimatedPrescriptionCosts = 
    (expectedPrescriptions * plan.prescriptionCoverage.generic * 12);

  const totalEstimatedCost = Math.min(
    annualPremium + estimatedVisitCosts + estimatedPrescriptionCosts,
    plan.outOfPocketMax + annualPremium
  );

  return {
    annualPremium,
    estimatedVisitCosts,
    estimatedPrescriptionCosts,
    totalEstimatedCost,
    monthlyEstimate: totalEstimatedCost / 12
  };
}

// Export types for use in components
export type {
  UserPreferences,
  InsurancePlan,
  PlanScore
};