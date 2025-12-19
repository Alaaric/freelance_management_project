export interface CreateProjetDTO {
  titre: string;
  description: string;
  skillsRequis: string[];
  budgetMaxTjm: number;
}

export interface ProjetResponseDTO {
  id: number;
  titre: string;
  description: string;
  skillsRequis: string[];
  budgetMaxTjm: number;
  entrepriseId: number;
  freelanceId: number | null;
}

export interface ProjetWithScoreResponseDTO extends ProjetResponseDTO {
  compatibilityScore: number;
}
