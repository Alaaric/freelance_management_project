import { AppException } from './base.exception';

export class BadRequestException extends AppException {
  readonly statusCode = 400;

  constructor(message: string) {
    super(message);
  }
}
