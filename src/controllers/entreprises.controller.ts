import { Request, Response } from 'express';
import { entreprisesService } from '../services';
import { CreateEntrepriseDTO, CreateProjetDTO } from '../dto';
import { EntrepriseValidator } from '../validators';
import { NotFoundException } from '../exceptions';
import { BaseController } from './base.controller';
import { HttpStatus } from '../constants/http-status';

class EntreprisesController extends BaseController {
  async createEntreprise(req: Request, res: Response): Promise<void> {
    try {
      const createEntrepriseDto: CreateEntrepriseDTO = req.body;

      EntrepriseValidator.validateCreate(createEntrepriseDto);

      const entreprise = await entreprisesService.createEntreprise(createEntrepriseDto);
      res.jsonSuccess(entreprise, HttpStatus.CREATED);
    } catch (error: any) {
      this.handleError(error, res);
    }
  }

  async getAllEntreprises(req: Request, res: Response): Promise<void> {
    try {
      const entreprises = await entreprisesService.getAllEntreprises();
      res.jsonSuccess(entreprises, HttpStatus.OK);
    } catch (error: any) {
      this.handleError(error, res);
    }
  }

  async getEntrepriseById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.validatedIds!.id;

      if (!id) {
        throw new NotFoundException('Freelance');
      }

      const entreprise = await entreprisesService.getEntrepriseById(id);

      if (!entreprise) {
        throw new NotFoundException('Company');
      }

      res.jsonSuccess(entreprise, HttpStatus.OK);
    } catch (error: any) {
      this.handleError(error, res);
    }
  }

  async createProject(req: Request, res: Response): Promise<void> {
    try {
      const entrepriseId = req.validatedIds!.id;
      const createProjetDto: CreateProjetDTO = req.body;
      
      if (!entrepriseId) {
        throw new NotFoundException('Entreprise');
      }


      EntrepriseValidator.validateCreateProjet(createProjetDto);

      const projet = await entreprisesService.createProjet(entrepriseId, createProjetDto);
      res.jsonSuccess(projet, HttpStatus.CREATED);
    } catch (error: any) {
      this.handleError(error, res);
    }
  }

  async getProjetsByEntreprise(req: Request, res: Response): Promise<void> {
    try {
      const entrepriseId = req.validatedIds!.id;
      
      if (!entrepriseId) {
        throw new NotFoundException('Entreprise');
      }

      const projets = await entreprisesService.getProjetsByEntreprise(entrepriseId);
      res.jsonSuccess(projets, HttpStatus.OK);
    } catch (error: any) {
      this.handleError(error, res);
    }
  }

  async getCandidatsCompatibles(req: Request, res: Response): Promise<void> {
    try {
      const entrepriseId = req.validatedIds!.id;
      const projetId = req.validatedIds!.projetId;

      if (!entrepriseId || !projetId) {
        throw new NotFoundException('Entreprise or Project');
      }

      const candidats = await entreprisesService.getCandidatsCompatibles(
        entrepriseId,
        projetId
      );
      res.jsonSuccess(candidats, HttpStatus.OK);
    } catch (error: any) {
      this.handleError(error, res);
    }
  }
}

export default new EntreprisesController();
