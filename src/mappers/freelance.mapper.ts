import { Freelance } from '../types';
import { FreelanceResponseDTO, FreelanceWithScoreResponseDTO } from '../dto';

export class FreelanceMapper {
  static toResponseDTO(entity: Freelance): FreelanceResponseDTO {
    return {
      id: entity.id,
      nom: entity.nom,
      email: entity.email,
      skills: entity.skills,
      tjm: entity.tjm
    };
  }

  static toWithScoreDTO(entity: Freelance, compatibilityScore: number): FreelanceWithScoreResponseDTO {
    return {
      ...this.toResponseDTO(entity),
      compatibilityScore
    };
  }

  static toResponseDTOList(entities: Freelance[]): FreelanceResponseDTO[] {
    return entities.map(entity => this.toResponseDTO(entity));
  }
}
