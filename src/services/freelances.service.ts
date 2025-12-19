import { CreateFreelanceDTO } from '../dto';
import { Freelance, Projet, CandidatureResponse, ProjetWithScore } from '../types';
import { matchingService } from './';
import { NotFoundException, ConflictException } from '../exceptions';
import { freelanceRepository, projetRepository } from '../repositories';

class FreelancesService {

  public async createFreelance(data: CreateFreelanceDTO): Promise<Freelance> {
    try {
      return await freelanceRepository.create(data);
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('This email is already in use');
      }
      throw error;
    }
  }

  public async getAllFreelances(skillFilter?: string): Promise<Freelance[]> {
    const freelances = await freelanceRepository.findAll();

    if (skillFilter) {
      const normalizedFilter = skillFilter.toLowerCase().trim();
      return freelances.filter((freelance: Freelance) =>
        freelance.skills.some((skill: string) =>
          skill.toLowerCase().trim() === normalizedFilter
        )
      );
    }

    return freelances;
  }


  public async getFreelanceById(id: number): Promise<Freelance | null> {
    return await freelanceRepository.findById(id);
  }


  public async getCompatibleProjects(freelanceId: number): Promise<ProjetWithScore[]> {
    const freelance = await freelanceRepository.findById(freelanceId);
    
    if (!freelance) {
      throw new NotFoundException('Freelance');
    }

    const openProjects = await projetRepository.findUnassigned();

    const projectsWithScores = openProjects.map(projet => ({
      ...projet,
      compatibilityScore: matchingService.calculateCompatibilityScore(
        freelance.skills,
        projet.skillsRequis
      )
    }));

    return matchingService.filterAndSortProjects(projectsWithScores, freelance.tjm);
  }


  public async postulerAProjet(
    freelanceId: number,
    projetId: number
  ): Promise<CandidatureResponse> {

    const freelance = await freelanceRepository.findById(freelanceId);
    if (!freelance) {
      throw new NotFoundException('Freelance');
    }

    const projet = await projetRepository.findById(projetId);

    if (!projet) {
      throw new NotFoundException('Project');
    }

    const { compatible, reasons } = matchingService.checkCompatibility(
      freelance,
      projet
    );

    if (!compatible) {
      return {
        statut: 'REFUSEE',
        message: 'Application rejected',
        reasons
      };
    }

    const updatedProject = await projetRepository.assignFreelance(projetId, freelanceId);

    return {
      statut: 'ACCEPTEE',
      message: 'Application accepted! You are assigned to the project.',
      projet: updatedProject
    };
  }
}

export default new FreelancesService();
