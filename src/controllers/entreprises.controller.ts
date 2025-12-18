import { Request, Response } from 'express';
import { entreprisesService } from '../services';
import { CreateEntrepriseDTO, CreateProjetDTO } from '../dto';
import { EntrepriseValidator } from '../validators';
import { BaseController } from './base.controller';

class EntreprisesController extends BaseController {
  async createEntreprise(req: Request, res: Response): Promise<void> {
    try {
      const createEntrepriseDto: CreateEntrepriseDTO = req.body;

      EntrepriseValidator.validateCreate(createEntrepriseDto);

      const entreprise = await entreprisesService.createEntreprise(createEntrepriseDto);
      res.jsonSuccess(entreprise, 201);
    } catch (error: any) {
      this.handleError(error, res);
    }
  }

  async getAllEntreprises(req: Request, res: Response): Promise<void> {
    try {
      const entreprises = await entreprisesService.getAllEntreprises();
      res.jsonSuccess(entreprises);
    } catch (error: any) {
      this.handleError(error, res);
    }
  }

  async getEntrepriseById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id!);

      if (isNaN(id)) {
        res.jsonError('Invalid ID', 400);
        return;
      }

      const entreprise = await entreprisesService.getEntrepriseById(id);

      if (!entreprise) {
        res.jsonError('Company not found', 404);
        return;
      }

      res.jsonSuccess(entreprise);
    } catch (error: any) {
      this.handleError(error, res);
    }
  }

  async createProject(req: Request, res: Response): Promise<void> {
    try {
      const entrepriseId = parseInt(req.params.id!);
      const createProjetDto: CreateProjetDTO = req.body;

      if (isNaN(entrepriseId)) {
        res.jsonError('Invalid ID', 400);
        return;
      }

      EntrepriseValidator.validateCreateProjet(createProjetDto);

      const projet = await entreprisesService.createProjet(entrepriseId, createProjetDto);
      res.jsonSuccess(projet, 201);
    } catch (error: any) {
      this.handleError(error, res);
    }
  }

  async getProjetsByEntreprise(req: Request, res: Response): Promise<void> {
    try {
      const entrepriseId = parseInt(req.params.id!);

      if (isNaN(entrepriseId)) {
        res.jsonError('Invalid ID', 400);
        return;
      }

      const projets = await entreprisesService.getProjetsByEntreprise(entrepriseId);
      res.jsonSuccess(projets);
    } catch (error: any) {
      this.handleError(error, res);
    }
  }

  async getCandidatsCompatibles(req: Request, res: Response): Promise<void> {
    try {
      const entrepriseId = parseInt(req.params.id!);
      const projetId = parseInt(req.params.projetId!);

      if (isNaN(entrepriseId) || isNaN(projetId)) {
        res.jsonError('Invalid IDs', 400);
        return;
      }

      const candidats = await entreprisesService.getCandidatsCompatibles(
        entrepriseId,
        projetId
      );
      res.jsonSuccess(candidats);
    } catch (error: any) {
      this.handleError(error, res);
    }
  }
}

export default new EntreprisesController();
