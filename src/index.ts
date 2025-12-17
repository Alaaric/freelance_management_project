import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import v1Router from './routers/v1';
import { jsonApiResponseMiddleware } from './middleware/json-response.middleware';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(jsonApiResponseMiddleware);

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.get('/health', (req: Request, res: Response) => {
  res.jsonSuccess({
    status: 'ok',
    message: 'SkillMatch API is running',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/v1', v1Router);

app.use((req: Request, res: Response) => {
  res.jsonError('Route not found', 404);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
