import { Request, Response } from 'express';
import { freelancesService } from '../services';
import { CreateFreelanceDTO, FilterFreelancesDTO } from '../dto';
import { FreelanceValidator } from '../validators';
import { NotFoundException } from '../exceptions';
import { BaseController } from './base.controller';
import { HttpStatus } from '../constants/http-status';
import { FreelanceMapper, ProjetMapper } from '../mappers';

class FreelancesController extends BaseController {
  async createFreelance(req: Request, res: Response): Promise<void> {
    try {
      const createFreelanceDto: CreateFreelanceDTO = req.body;

      FreelanceValidator.validateCreate(createFreelanceDto);

      const freelance = await freelancesService.createFreelance(createFreelanceDto);
      const dto = FreelanceMapper.toResponseDTO(freelance);
      res.jsonSuccess(dto, HttpStatus.CREATED);
    } catch (error: any) {
      this.handleError(error, res);
    }
  }

  async getAllFreelances(req: Request, res: Response): Promise<void> {
    try {
      const { skill } = req.query as FilterFreelancesDTO;
      const freelances = await freelancesService.getAllFreelances(skill);
      const dtos = FreelanceMapper.toResponseDTOList(freelances);
      res.jsonSuccess(dtos, HttpStatus.OK);
    } catch (error: any) {
      this.handleError(error, res);
    }
  }

  async getFreelanceById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.validatedIds!.id;

      if (!id) {
        throw new NotFoundException('Freelance');
      }

      const freelance = await freelancesService.getFreelanceById(id);

      if (!freelance) {
        throw new NotFoundException('Freelance');
      }

      const dto = FreelanceMapper.toResponseDTO(freelance);
      res.jsonSuccess(dto, HttpStatus.OK);
    } catch (error: any) {
      this.handleError(error, res);
    }
  }

  async getCompatibleProjects(req: Request, res: Response): Promise<void> {
    try {
      const id = req.validatedIds!.id;

      if (!id) {
        throw new NotFoundException('Freelance');
      }

      const projets = await freelancesService.getCompatibleProjects(id);
      const dtos = projets.map(p => ProjetMapper.toWithScoreDTO(p, p.compatibilityScore));
      res.jsonSuccess(dtos, HttpStatus.OK);
    } catch (error: any) {
      this.handleError(error, res);
    }
  }

  async postulerAProjet(req: Request, res: Response): Promise<void> {
    try {
      const freelanceId = req.validatedIds!.id;
      const projetId = req.validatedIds!.projetId;
      
      if (!projetId || !freelanceId) {
        throw new NotFoundException('Project or Freelance');
      }

      const result = await freelancesService.postulerAProjet(
        freelanceId,
        projetId
      );

      res.jsonSuccess(result, HttpStatus.OK);
    } catch (error: any) {
      this.handleError(error, res);
    }
  }
}

export default new FreelancesController();
