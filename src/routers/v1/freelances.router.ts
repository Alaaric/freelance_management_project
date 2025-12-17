import { Router } from 'express';
import { freelancesController } from '../../controllers';

const router = Router();

router.post('/', (req, res) => {
  freelancesController.createFreelance(req, res);
});

router.get('/', (req, res) => {
  freelancesController.getAllFreelances(req, res);
});

router.get('/:id', (req, res) => {
  freelancesController.getFreelanceById(req, res);
});

router.get('/:id/projets-compatibles', (req, res) => {
  freelancesController.getCompatibleProjects(req, res);
});

router.post('/:id/postuler/:projetId', (req, res) => {
  freelancesController.postulerAProjet(req, res);
});

export default router;
