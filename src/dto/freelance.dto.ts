export interface CreateFreelanceDTO {
  nom: string;
  email: string;
  skills: string[];
  tjm: number;
}

export interface FilterFreelancesDTO {
  skill?: string;
}

export interface FreelanceResponseDTO {
  id: number;
  nom: string;
  email: string;
  skills: string[];
  tjm: number;
}

export interface FreelanceWithScoreResponseDTO extends FreelanceResponseDTO {
  compatibilityScore: number;
}
