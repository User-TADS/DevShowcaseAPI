import { Router } from 'express';
import { projectController } from '../controllers/project.controller';
import { validateBody } from '../middlewares/validate.middleware';
import { CreateProjectSchema } from '../dtos/project.dto';

const router = Router();

router.post('/', validateBody(CreateProjectSchema), (req, res, next) => {
  projectController.create(req, res, next);
});

router.get('/', (req, res, next) => {
  projectController.getAll(req, res, next);
});

router.get('/:id', (req, res, next) => {
  projectController.getById(req, res, next);
});

export default router;
