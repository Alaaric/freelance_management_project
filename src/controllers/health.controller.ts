import { Request, Response } from 'express';
import { BaseController } from './base.controller';

class HealthController extends BaseController {
  async checkHealth(_req: Request, res: Response): Promise<void> {
    res.jsonSuccess({
      status: 'ok',
      message: 'SkillMatch API is running',
      timestamp: new Date().toISOString()
    },
        200
    );
  }
}

export default new HealthController();
