import express, { Application } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { env } from './config';
import v1Router from './routers/v1';
import healthRouter from './routers/health.router';
import { jsonApiResponseMiddleware } from './middleware/json-response.middleware';
import { notFoundHandler } from './middleware/not-found.middleware';
import { globalErrorHandler } from './middleware/error-handler.middleware';
import { swaggerSpec } from '../docs';

const app: Application = express();
const PORT = env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(jsonApiResponseMiddleware);

app.use('/health', healthRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1', v1Router);

app.use(notFoundHandler);
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
