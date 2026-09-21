import { Router } from 'express';
import profileRoutes from './profile.routes';
import technologyRoutes from './technology.routes';
import projectRoutes from './project.routes';
import feedbackRoutes from './feedback.routes';
import databaseRoutes from './database.routes';

const router = Router();

// Rota de status da API
router.get('/', (req, res) => {
  res.json({
    name: 'DevShowcase API',
    version: '1.0.0',
    status: 'online',
    description: 'API REST com persistência relacional para portfólio de desenvolvedores e projetos',
    documentation: {
      swagger: '/docs',
      swaggerAlt: '/api-docs',
    },
    endpoints: {
      profiles: '/api/profiles',
      technologies: '/api/technologies',
      projects: '/api/projects',
      feedbacks: '/api/feedbacks',
      databaseReset: '/api/database/reset',
      databaseClean: '/api/database/clean',
    },
  });
});

// Agrupamento dos módulos
router.use('/profiles', profileRoutes);
router.use('/technologies', technologyRoutes);
router.use('/projects', projectRoutes);
router.use('/feedbacks', feedbackRoutes);
router.use('/database', databaseRoutes);

export default router;
