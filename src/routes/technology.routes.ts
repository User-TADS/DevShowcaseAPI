import { Router } from 'express';
import { technologyController } from '../controllers/technology.controller';
import { validateBody } from '../middlewares/validate.middleware';
import { CreateTechnologySchema } from '../dtos/technology.dto';

const router = Router();

// POST /api/technologies - Cadastro de tecnologia com validações
router.post('/', validateBody(CreateTechnologySchema), (req, res, next) => {
  technologyController.create(req, res, next);
});

// GET /api/technologies - Listagem de todas as tecnologias
router.get('/', (req, res, next) => {
  technologyController.getAll(req, res, next);
});

export default router;
