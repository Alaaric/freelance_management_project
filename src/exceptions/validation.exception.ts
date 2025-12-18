import { AppException } from './base.exception';
import { HttpStatus } from '../constants/http-status';

export class ValidationException extends AppException {
  readonly statusCode = HttpStatus.BAD_REQUEST;

  constructor(message: string) {
    super(message);
  }
}
