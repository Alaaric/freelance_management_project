import { Router, Request, Response } from 'express';
import { entreprisesController } from '../../controllers';
import { asyncHandler } from '../../utils/async-handler';
import { validateIdParams } from '../../middleware/validate-id.middleware';

const router = Router();

router.post('/', asyncHandler((req: Request, res: Response) => entreprisesController.createEntreprise(req, res)));
router.get('/', asyncHandler((req: Request, res: Response) => entreprisesController.getAllEntreprises(req, res)));
router.get('/:id', validateIdParams('id'), asyncHandler((req: Request, res: Response) => entreprisesController.getEntrepriseById(req, res)));
router.post('/:id/projets', validateIdParams('id'), asyncHandler((req: Request, res: Response) => entreprisesController.createProject(req, res)));
router.get('/:id/projets', validateIdParams('id'), asyncHandler((req: Request, res: Response) => entreprisesController.getProjetsByEntreprise(req, res)));
router.get('/:id/projets/:projetId/candidats-compatibles', validateIdParams('id', 'projetId'), asyncHandler((req: Request, res: Response) => entreprisesController.getCandidatsCompatibles(req, res)));

export default router;
