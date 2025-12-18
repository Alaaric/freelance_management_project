import { Router, Request, Response } from 'express';
import { freelancesController } from '../../controllers';
import { asyncHandler } from '../../utils/async-handler';

const router = Router();

router.post('/', asyncHandler((req: Request, res: Response) => freelancesController.createFreelance(req, res)));
router.get('/', asyncHandler((req: Request, res: Response) => freelancesController.getAllFreelances(req, res)));
router.get('/:id', asyncHandler((req: Request, res: Response) => freelancesController.getFreelanceById(req, res)));
router.get('/:id/projets-compatibles', asyncHandler((req: Request, res: Response) => freelancesController.getCompatibleProjects(req, res)));
router.post('/:id/postuler/:projetId', asyncHandler((req: Request, res: Response) => freelancesController.postulerAProjet(req, res)));

export default router;
