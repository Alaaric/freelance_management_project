import { prisma } from '../config';
import { Freelance } from '../types';
import { CreateFreelanceDTO } from '../dto';
import { IFreelanceRepository } from './interfaces/freelance.repository.interface';

class FreelanceRepository implements IFreelanceRepository {

  async create(data: CreateFreelanceDTO): Promise<Freelance> {
    return await prisma.freelance.create({
      data: {
        nom: data.nom,
        email: data.email,
        skills: data.skills,
        tjm: data.tjm
      }
    });
  }

  async findAll(): Promise<Freelance[]> {
    return await prisma.freelance.findMany({
      orderBy: { id: 'asc' }
    });
  }

  async findById(id: number): Promise<Freelance | null> {
    return await prisma.freelance.findUnique({
      where: { id }
    });
  }

  async existsByEmail(email: string): Promise<boolean> {
    const count = await prisma.freelance.count({
      where: { email }
    });
    return count > 0;
  }
}

export default new FreelanceRepository();
