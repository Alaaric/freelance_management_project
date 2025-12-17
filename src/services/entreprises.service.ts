import { CreateEntrepriseDTO, CreateProjetDTO } from '../dto';
import { Entreprise, Projet, Freelance } from '../types';
import { matchingService } from './';
import { ValidationException, NotFoundException, BadRequestException } from '../exceptions';
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

    const entreprise = await this.getEntrepriseById(entrepriseId);
    if (!entreprise) {
      throw new NotFoundException('Company');
    }

    if (data.budgetMaxTjm < 0) {
      throw new ValidationException('Maximum budget cannot be negative');
    }

    if (data.skillsRequis.length === 0) {
      throw new ValidationException('Project must require at least one skill');
    }

    return await projetRepository.create(entrepriseId, data);
  }

  public async getProjetsByEntreprise(entrepriseId: number): Promise<Projet[]> {

    const entreprise = await this.getEntrepriseById(entrepriseId);
    if (!entreprise) {
      throw new NotFoundException('Company');
    }

    return await projetRepository.findByEntrepriseId(entrepriseId);
  }

  public async getCandidatsCompatibles(
    entrepriseId: number,
    projetId: number
  ): Promise<Freelance[]> {

    const entreprise = await this.getEntrepriseById(entrepriseId);
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

    return freelances.filter((freelance: Freelance) => {
      const { compatible } = matchingService.checkCompatibility(freelance, projet);
      return compatible;
    });
  }
}

export default new EntreprisesService();
