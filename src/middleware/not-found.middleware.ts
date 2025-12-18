import { Request, Response } from 'express';
import { HttpStatus } from '../constants/http-status';

export const notFoundHandler = (req: Request, res: Response) => {
  res.jsonError('Route not found', HttpStatus.NOT_FOUND);
};
