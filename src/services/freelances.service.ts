import { CreateFreelanceDTO } from '../dto';
import { Freelance, Projet, CandidatureResponse } from '../types';
import { matchingService } from './';
import { ValidationException, NotFoundException, ConflictException } from '../exceptions';
import { freelanceRepository, projetRepository } from '../repositories';

interface ProjetWithScore extends Projet {
  compatibilityScore: number;
}

class FreelancesService {

  public async createFreelance(data: CreateFreelanceDTO): Promise<Freelance> {

    if (data.tjm < 0) {
      throw new ValidationException('Daily rate cannot be negative');
    }

    if (data.skills.length === 0) {
      throw new ValidationException('Freelance must have at least one skill');
    }

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

    return openProjects
      .map((projet: Projet): ProjetWithScore => ({
        ...projet,
        compatibilityScore: matchingService.calculateCompatibilityScore(
          freelance.skills,
          projet.skillsRequis
        )
      }))
      .filter((projet: ProjetWithScore) => 
        projet.compatibilityScore > 0 && 
        freelance.tjm <= projet.budgetMaxTjm
      )
      .sort((a, b) => b.compatibilityScore - a.compatibilityScore);
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
