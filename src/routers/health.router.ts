import { Router, Request, Response } from 'express';
import healthController from '../controllers/health.controller';
import { asyncHandler } from '../utils/async-handler';

const healthRouter = Router();

healthRouter.get('/', asyncHandler((req: Request, res: Response) => healthController.checkHealth(req, res)));

export default healthRouter;
