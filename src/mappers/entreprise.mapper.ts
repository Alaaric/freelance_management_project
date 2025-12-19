import { Entreprise } from '../types';
import { EntrepriseResponseDTO } from '../dto';

export class EntrepriseMapper {
  static toResponseDTO(entity: Entreprise): EntrepriseResponseDTO {
    return {
      id: entity.id,
      nom: entity.nom,
      secteur: entity.secteur
    };
  }

  static toResponseDTOList(entities: Entreprise[]): EntrepriseResponseDTO[] {
    return entities.map(entity => this.toResponseDTO(entity));
  }
}
