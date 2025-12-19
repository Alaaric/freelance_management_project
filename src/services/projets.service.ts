import { Projet } from '../types';
import { projetRepository } from '../repositories';

class ProjetsService {

  public async getAllOpenProjects(): Promise<Projet[]> {
    return await projetRepository.findUnassigned();
  }
}

export default new ProjetsService();
