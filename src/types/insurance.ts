export interface InsurancePlan {
  id: string;
  name: string;
  type: 'EPO' | 'HMO' | 'PPO' | 'Medicare' | 'Supplemental';
  monthlyPremium: number;
  deductible: number;
  outOfPocketMax: number;
  coverageDetails: {
    preventiveCare: string;
    primaryCareCopay: string;
    specialistVisit: string;
    emergencyRoom: string;
  };
}

export interface Provider {
  id: string;
  name: string;
  specialty: string;
  location: string;
  phone: string;
  network: string[];
}

export type SearchCriteria = 'name' | 'specialty' | 'location' | 'network';
