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

<<<<<<< HEAD
export type SearchCriteria = 'name' | 'specialty' | 'location' | 'network';
=======
export type SearchCriteria = 'name' | 'specialty' | 'location' | 'network';
>>>>>>> 2cf111364f7c46e4f08e582ede8aebf03360532b
