import { Router } from 'express';
import profileRoutes from './profile.routes';
import technologyRoutes from './technology.routes';
import projectRoutes from './project.routes';
import feedbackRoutes from './feedback.routes';

const router = Router();

// Rota de status da API
router.get('/', (req, res) => {
  res.json({
    name: 'DevShowcase API',
    version: '1.0.0',
    status: 'online',
    description: 'API REST com persistência relacional para portfólio de desenvolvedores e projetos',
    endpoints: {
      profiles: '/api/profiles',
      technologies: '/api/technologies',
      projects: '/api/projects',
      feedbacks: '/api/feedbacks',
    },
  });
});

// Agrupamento dos módulos
router.use('/profiles', profileRoutes);
router.use('/technologies', technologyRoutes);
router.use('/projects', projectRoutes);
router.use('/feedbacks', feedbackRoutes);

export default router;
