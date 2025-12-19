import { CreateEntrepriseDTO, CreateProjetDTO } from '../dto';
import { Entreprise, Projet, FreelanceWithScore } from '../types';
import { matchingService } from './';
import { NotFoundException, BadRequestException } from '../exceptions';
import { entrepriseRepository, projetRepository, freelanceRepository } from '../repositories';

class EntreprisesService {

  public async createEntreprise(data: CreateEntrepriseDTO): Promise<Entreprise> {
    return await entrepriseRepository.create(data);
  }

  public async getAllEntreprises(): Promise<Entreprise[]> {
    return await entrepriseRepository.findAll();
  }

  public async getEntrepriseById(id: number): Promise<Entreprise | null> {
    return await entrepriseRepository.findById(id);
  }

  public async createProjet(
    entrepriseId: number,
    data: CreateProjetDTO
  ): Promise<Projet> {

    const entreprise = await entrepriseRepository.findById(entrepriseId);
    if (!entreprise) {
      throw new NotFoundException('Company');
    }

    return await projetRepository.create(entrepriseId, data);
  }

  public async getProjetsByEntreprise(entrepriseId: number): Promise<Projet[]> {

    const entreprise = await entrepriseRepository.findById(entrepriseId);
    if (!entreprise) {
      throw new NotFoundException('Company');
    }

    return await projetRepository.findByEntrepriseId(entrepriseId);
  }

  public async getCandidatsCompatibles(
    entrepriseId: number,
    projetId: number
  ): Promise<FreelanceWithScore[]> {

    const entreprise = await entrepriseRepository.findById(entrepriseId);
    if (!entreprise) {
      throw new NotFoundException('Company');
    }

    const projet = await projetRepository.findById(projetId);

    if (!projet) {
      throw new NotFoundException('Project');
    }

    const belongs = await projetRepository.belongsToEntreprise(projetId, entrepriseId);
    if (!belongs) {
      throw new BadRequestException('This project does not belong to this company');
    }

    const freelances = await freelanceRepository.findAll();

    const freelancesWithScores = freelances.map(freelance => ({
      ...freelance,
      compatibilityScore: matchingService.calculateCompatibilityScore(
        freelance.skills,
        projet.skillsRequis
      )
    }));

    return matchingService.filterAndSortFreelances(freelancesWithScores, projet.budgetMaxTjm);
  }
}

export default new EntreprisesService();
