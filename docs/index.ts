import swaggerJsdoc from 'swagger-jsdoc';
import { swaggerOptions } from './swagger.config';

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
