export const swaggerOptions = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'SkillMatch API',
      version: '1.0.0',
      description: 'API for managing freelancers and company projects with skill matching',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Version 1'
      }
    ],
    tags: [
      {
        name: 'Freelances',
        description: 'Freelance management endpoints'
      },
      {
        name: 'Entreprises',
        description: 'Company and project management endpoints'
      },
      {
        name: 'Projets',
        description: 'Project listing endpoints'
      }
    ]
  },
  apis: ['./docs/schemas/*.ts', './docs/paths/*.ts']
};
