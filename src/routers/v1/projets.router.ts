import { Router, Request, Response } from 'express';
import projetsController from '../../controllers/projets.controller';
import { asyncHandler } from '../../utils/async-handler';

const router = Router();

router.get('/ouverts', asyncHandler((req: Request, res: Response) => projetsController.getAllOpenProjects(req, res)));

export default router;
