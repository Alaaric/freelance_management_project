import { prisma } from '../config';
import { Entreprise } from '../types';
import { CreateEntrepriseDTO } from '../dto';
import { IEntrepriseRepository } from './interfaces/entreprise.repository.interface';

class EntrepriseRepository implements IEntrepriseRepository {

  async create(data: CreateEntrepriseDTO): Promise<Entreprise> {
    return await prisma.entreprise.create({
      data: {
        nom: data.nom,
        secteur: data.secteur
      }
    });
  }

  async findAll(): Promise<Entreprise[]> {
    return await prisma.entreprise.findMany({
      orderBy: { id: 'asc' }
    });
  }

  async findById(id: number): Promise<Entreprise | null> {
    return await prisma.entreprise.findUnique({
      where: { id }
    });
  }
}

export default new EntrepriseRepository();
