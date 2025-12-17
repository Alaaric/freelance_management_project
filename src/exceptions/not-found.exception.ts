import { AppException } from './base.exception';

export class NotFoundException extends AppException {
  readonly statusCode = 404;

  constructor(resource: string) {
    super(`${resource} not found`);
  }
}
