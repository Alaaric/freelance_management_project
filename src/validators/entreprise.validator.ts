import { BaseValidator } from './base.validator';
import { CreateEntrepriseDTO, CreateProjetDTO } from '../dto';

export class EntrepriseValidator {
  static validateCreate(data: CreateEntrepriseDTO): void {
    BaseValidator.validateRequired(data, ['nom', 'secteur']);
  }

  static validateCreateProjet(data: CreateProjetDTO): void {
    BaseValidator.validateRequired(data, ['titre', 'description', 'skillsRequis', 'budgetMaxTjm']);
    BaseValidator.validateArray(data, 'skillsRequis');
    BaseValidator.validatePositiveNumber(data.budgetMaxTjm, 'Maximum budget');
  }
}
