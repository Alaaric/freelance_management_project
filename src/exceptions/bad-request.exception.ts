import { AppException } from './base.exception';
import { HttpStatus } from '../constants/http-status';

export class BadRequestException extends AppException {
  readonly statusCode = HttpStatus.BAD_REQUEST;

  constructor(message: string) {
    super(message);
  }
}
