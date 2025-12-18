import { NextFunction, Request, Response } from 'express';
import { JsonApiResponse } from '../types';
import { HttpStatus } from '../constants/http-status';

declare module 'express-serve-static-core' {
  interface Response {
    jsonSuccess(data: any, statusCode?: number): void;
    jsonError(message: string, statusCode?: number): void;    
  }
}

export const jsonApiResponseMiddleware = (_req: Request, res: Response, next: NextFunction) => {
  res.jsonSuccess = (data: any, statusCode: number = HttpStatus.OK) => {
    const response: JsonApiResponse = {
      success: true,
      data
    };
    res.status(statusCode).json(response);
  };

  res.jsonError = (message: string, statusCode: number = HttpStatus.BAD_REQUEST) => {
    const response: JsonApiResponse = {
      success: false,
      data: null,
      errors: [{ message, code: statusCode }]
    };
    res.status(statusCode).json(response);
  };

  next();
};
