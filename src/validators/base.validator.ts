import { ValidationException } from '../exceptions';

export class BaseValidator {
  static validateRequired(data: any, fields: string[]): void {
    const missing = fields.filter(field => {
      const value = data[field];
      return value === undefined || value === null || value === '';
    });

    if (missing.length > 0) {
      throw new ValidationException(`Missing required fields: ${missing.join(', ')}`);
    }
  }

  static validateArray(data: any, field: string): void {
    if (!Array.isArray(data[field])) {
      throw new ValidationException(`Field '${field}' must be an array`);
    }
    
    if (data[field].length === 0) {
      throw new ValidationException(`Field '${field}' cannot be empty`);
    }
  }

  static validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ValidationException('Invalid email format');
    }
  }

  static validatePositiveNumber(value: number, fieldName: string): void {
    if (value < 0) {
      throw new ValidationException(`${fieldName} must be positive`);
    }
  }
}
