import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../constants/http-status';

export const globalErrorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  
  res.jsonError('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
};
