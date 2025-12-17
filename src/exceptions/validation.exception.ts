import { AppException } from './base.exception';

export class ValidationException extends AppException {
  readonly statusCode = 400;

  constructor(message: string) {
    super(message);
  }
}
