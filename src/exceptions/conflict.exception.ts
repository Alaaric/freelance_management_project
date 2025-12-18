import { AppException } from './base.exception';
import { HttpStatus } from '../constants/http-status';

export class ConflictException extends AppException {
  readonly statusCode = HttpStatus.CONFLICT;

  constructor(message: string) {
    super(message);
  }
}
