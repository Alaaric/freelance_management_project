import { Request, Response } from 'express';

export const notFoundHandler = (req: Request, res: Response) => {
  res.jsonError('Route not found', 404);
};
