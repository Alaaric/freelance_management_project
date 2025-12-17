import { BaseValidator } from './base.validator';
import { CreateFreelanceDTO } from '../dto';

export class FreelanceValidator {
  static validateCreate(data: CreateFreelanceDTO): void {
    BaseValidator.validateRequired(data, ['nom', 'email', 'skills', 'tjm']);
    BaseValidator.validateEmail(data.email);
    BaseValidator.validateArray(data, 'skills');
    BaseValidator.validatePositiveNumber(data.tjm, 'Daily rate');
  }
}
