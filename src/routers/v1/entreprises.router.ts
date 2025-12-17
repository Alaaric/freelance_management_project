import { Router } from 'express';
import { entreprisesController } from '../../controllers';

const router = Router();

router.post('/', (req, res) => {
  entreprisesController.createEntreprise(req, res);
});

router.get('/', (req, res) => {
  entreprisesController.getAllEntreprises(req, res);
});

router.get('/:id', (req, res) => {
  entreprisesController.getEntrepriseById(req, res);
});

router.post('/:id/projets', (req, res) => {
  entreprisesController.createProject(req, res);
});

router.get('/:id/projets', (req, res) => {
  entreprisesController.getProjetsByEntreprise(req, res);
});

router.get('/:id/projets/:projetId/candidats-compatibles', (req, res) => {
  entreprisesController.getCandidatsCompatibles(req, res);
});

export default router;
