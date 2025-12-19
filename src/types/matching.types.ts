import type { Projet, Freelance } from '@prisma/client';

export interface MatchingResult {
  success: boolean;
  message: string;
  projet?: Projet;
  reasons?: string[];
}

export interface CandidatureResponse {
  statut: 'ACCEPTEE' | 'REFUSEE';
  message: string;
  reasons?: string[];
  projet?: Projet;
}

export interface ProjetWithScore extends Projet {
  compatibilityScore: number;
}

export interface FreelanceWithScore extends Freelance {
  compatibilityScore: number;
}
