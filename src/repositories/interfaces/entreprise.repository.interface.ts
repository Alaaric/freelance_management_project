import { Entreprise } from '../../types';
import { CreateEntrepriseDTO } from '../../dto';

export interface IEntrepriseRepository {
  create(data: CreateEntrepriseDTO): Promise<Entreprise>;
  findAll(): Promise<Entreprise[]>;
  findById(id: number): Promise<Entreprise | null>;
}
