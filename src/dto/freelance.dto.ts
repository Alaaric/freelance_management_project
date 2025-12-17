export interface CreateFreelanceDTO {
  nom: string;
  email: string;
  skills: string[];
  tjm: number;
}

export interface FilterFreelancesDTO {
  skill?: string;
}
