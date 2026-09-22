import { Router } from 'express';
import { profileController } from '../controllers/profile.controller';
import { validateBody } from '../middlewares/validate.middleware';
import { CreateProfileSchema } from '../dtos/profile.dto';

const router = Router();

router.post('/', validateBody(CreateProfileSchema), (req, res, next) => {
  profileController.create(req, res, next);
});

router.get('/:id', (req, res, next) => {
  profileController.getById(req, res, next);
});

router.get('/', (req, res, next) => {
  profileController.getAll(req, res, next);
});

export default router;
