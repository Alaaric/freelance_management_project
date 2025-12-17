import { prisma } from '../config';
import { Projet } from '../types';
import { CreateProjetDTO } from '../dto';
import { IProjetRepository } from './interfaces/projet.repository.interface';

class ProjetRepository implements IProjetRepository {

  async create(entrepriseId: number, data: CreateProjetDTO): Promise<Projet> {
    return await prisma.projet.create({
      data: {
        titre: data.titre,
        description: data.description,
        skillsRequis: data.skillsRequis,
        budgetMaxTjm: data.budgetMaxTjm,
        entrepriseId: entrepriseId
      }
    });
  }

  async findByEntrepriseId(entrepriseId: number): Promise<Projet[]> {
    return await prisma.projet.findMany({
      where: { entrepriseId },
      orderBy: { id: 'asc' }
    });
  }

  async findUnassigned(): Promise<Projet[]> {
    return await prisma.projet.findMany({
      where: { freelanceId: null },
      orderBy: { id: 'asc' }
    });
  }

  async findById(id: number): Promise<Projet | null> {
    return await prisma.projet.findUnique({
      where: { id }
    });
  }

  async assignFreelance(projetId: number, freelanceId: number): Promise<Projet> {
    return await prisma.projet.update({
      where: { id: projetId },
      data: { freelanceId: freelanceId }
    });
  }

  async belongsToEntreprise(projetId: number, entrepriseId: number): Promise<boolean> {
    const projet = await prisma.projet.findFirst({
      where: {
        id: projetId,
        entrepriseId: entrepriseId
      }
    });
    return projet !== null;
  }
}

export default new ProjetRepository();
