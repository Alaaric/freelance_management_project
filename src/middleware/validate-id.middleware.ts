import { Request, Response, NextFunction } from 'express';
import { ValidationException } from '../exceptions';

declare module 'express-serve-static-core' {
  interface Request {
    validatedIds?: {
      [key: string]: number;
    };
  }
}

export const validateIdParams = (...paramNames: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.validatedIds = {};

      for (const paramName of paramNames) {
        const paramValue = req.params[paramName];
        
        if (!paramValue) {
          throw new ValidationException(`Missing parameter: ${paramName}`);
        }

        const parsedId = parseInt(paramValue, 10);

        if (isNaN(parsedId) || parsedId <= 0) {
          throw new ValidationException(`Invalid ${paramName}: must be a positive integer`);
        }

        req.validatedIds[paramName] = parsedId;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
