import { Router } from 'express';
import freelancesRouter from './freelances.router';
import entreprisesRouter from './entreprises.router';

const router = Router();

router.use('/freelances', freelancesRouter);
router.use('/entreprises', entreprisesRouter);

export default router;
