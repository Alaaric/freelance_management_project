import { Request, Response } from 'express';
import projetsService from '../services/projets.service';
import { BaseController } from './base.controller';
import { HttpStatus } from '../constants/http-status';
import { ProjetMapper } from '../mappers';

class ProjetsController extends BaseController {
  async getAllOpenProjects(req: Request, res: Response): Promise<void> {
    try {
      const projets = await projetsService.getAllOpenProjects();
      const dtos = ProjetMapper.toResponseDTOList(projets);
      res.jsonSuccess(dtos, HttpStatus.OK);
    } catch (error: any) {
      this.handleError(error, res);
    }
  }
}

export default new ProjetsController();
