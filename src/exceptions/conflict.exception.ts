import { AppException } from './base.exception';

export class ConflictException extends AppException {
  readonly statusCode = 409;

  constructor(message: string) {
    super(message);
  }
}
