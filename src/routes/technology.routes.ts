import { Router } from 'express';
import { technologyController } from '../controllers/technology.controller';
import { validateBody } from '../middlewares/validate.middleware';
import { CreateTechnologySchema } from '../dtos/technology.dto';

const router = Router();

router.post('/', validateBody(CreateTechnologySchema), (req, res, next) => {
  technologyController.create(req, res, next);
});

router.get('/', (req, res, next) => {
  technologyController.getAll(req, res, next);
});

export default router;
