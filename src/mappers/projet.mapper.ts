import { Projet } from '../types';
import { ProjetResponseDTO, ProjetWithScoreResponseDTO } from '../dto';

export class ProjetMapper {
  static toResponseDTO(entity: Projet): ProjetResponseDTO {
    return {
      id: entity.id,
      titre: entity.titre,
      description: entity.description,
      skillsRequis: entity.skillsRequis,
      budgetMaxTjm: entity.budgetMaxTjm,
      entrepriseId: entity.entrepriseId,
      freelanceId: entity.freelanceId
    };
  }

  static toWithScoreDTO(entity: Projet, compatibilityScore: number): ProjetWithScoreResponseDTO {
    return {
      ...this.toResponseDTO(entity),
      compatibilityScore
    };
  }

  static toResponseDTOList(entities: Projet[]): ProjetResponseDTO[] {
    return entities.map(entity => this.toResponseDTO(entity));
  }
}
