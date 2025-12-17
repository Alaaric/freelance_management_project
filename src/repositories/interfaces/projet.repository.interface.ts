import { Projet } from '../../types';
import { CreateProjetDTO } from '../../dto';

export interface IProjetRepository {
  create(entrepriseId: number, data: CreateProjetDTO): Promise<Projet>;
  findByEntrepriseId(entrepriseId: number): Promise<Projet[]>;
  findUnassigned(): Promise<Projet[]>;
  findById(id: number): Promise<Projet | null>;
  assignFreelance(projetId: number, freelanceId: number): Promise<Projet>;
  belongsToEntreprise(projetId: number, entrepriseId: number): Promise<boolean>;
}
