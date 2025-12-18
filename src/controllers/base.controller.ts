import { Response } from 'express';
import { AppException } from '../exceptions';

export abstract class BaseController {
  protected handleError(error: any, res: Response): void {
    if (error instanceof AppException) {
      res.jsonError(error.message, error.statusCode);
    } else {
      throw error;
    }
  }
}
