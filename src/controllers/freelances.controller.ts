import { Request, Response } from 'express';
import { freelancesService } from '../services';
import { CreateFreelanceDTO, FilterFreelancesDTO } from '../dto';
import { FreelanceValidator } from '../validators';
import { AppException, ValidationException, NotFoundException } from '../exceptions';
import { BaseController } from './base.controller';

class FreelancesController extends BaseController {
  async createFreelance(req: Request, res: Response): Promise<void> {
    try {
      const createFreelanceDto: CreateFreelanceDTO = req.body;

      FreelanceValidator.validateCreate(createFreelanceDto);

      const freelance = await freelancesService.createFreelance(createFreelanceDto);
      res.jsonSuccess(freelance, 201);
    } catch (error: any) {
      this.handleError(error, res);
    }
  }

  async getAllFreelances(req: Request, res: Response): Promise<void> {
    try {
      const { skill } = req.query as FilterFreelancesDTO;
      const freelances = await freelancesService.getAllFreelances(skill);
      res.jsonSuccess(freelances);
    } catch (error: any) {
      this.handleError(error, res);
    }
  }

  async getFreelanceById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id!);

      if (isNaN(id)) {
        throw new ValidationException('Invalid ID');
      }

      const freelance = await freelancesService.getFreelanceById(id);

      if (!freelance) {
        throw new NotFoundException('Freelance');
      }

      res.jsonSuccess(freelance);
    } catch (error: any) {
      this.handleError(error, res);
    }
  }

  async getCompatibleProjects(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id!);

      if (isNaN(id)) {
        throw new ValidationException('Invalid ID');
      }

      const projets = await freelancesService.getCompatibleProjects(id);
      res.jsonSuccess(projets);
    } catch (error: any) {
      this.handleError(error, res);
    }
  }

  async postulerAProjet(req: Request, res: Response): Promise<void> {
    try {
      const freelanceId = parseInt(req.params.id!);
      const projetId = parseInt(req.params.projetId!);

      if (isNaN(freelanceId) || isNaN(projetId)) {
        throw new ValidationException('Invalid IDs');
      }

      const result = await freelancesService.postulerAProjet(
        freelanceId,
        projetId
      );

      if (result.statut === 'ACCEPTEE') {
        res.jsonSuccess(result);
      } else {
        res.jsonError(result.message, 400);
      }
    } catch (error: any) {
      this.handleError(error, res);
    }
  }
}

export default new FreelancesController();
