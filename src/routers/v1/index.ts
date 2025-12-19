import { Router } from 'express';
import freelancesRouter from './freelances.router';
import entreprisesRouter from './entreprises.router';
import projetsRouter from './projets.router';

const router = Router();

router.use('/freelances', freelancesRouter);
router.use('/entreprises', entreprisesRouter);
router.use('/projets', projetsRouter);

export default router;
