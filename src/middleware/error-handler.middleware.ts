import { Request, Response, NextFunction } from 'express';

export const globalErrorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  
  res.jsonError('Internal server error', 500);
};
