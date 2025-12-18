import { AppException } from './base.exception';
import { HttpStatus } from '../constants/http-status';

export class NotFoundException extends AppException {
  readonly statusCode = HttpStatus.NOT_FOUND;

  constructor(resource: string) {
    super(`${resource} not found`);
  }
}
