import { Router } from 'express';
import { projectController } from '../controllers/project.controller';
import { validateBody } from '../middlewares/validate.middleware';
import { CreateProjectSchema } from '../dtos/project.dto';

const router = Router();

// POST /api/projects - Cadastro de projeto com validações e relacionamentos
router.post('/', validateBody(CreateProjectSchema), (req, res, next) => {
  projectController.create(req, res, next);
});

// GET /api/projects - Listagem de projetos (com filtro opcional por ?profileId=xxx)
router.get('/', (req, res, next) => {
  projectController.getAll(req, res, next);
});

// GET /api/projects/:id - Buscar projeto por ID com autor, tecnologias e feedbacks
router.get('/:id', (req, res, next) => {
  projectController.getById(req, res, next);
});

export default router;
