import { Router } from 'express';
import { feedbackController } from '../controllers/feedback.controller';
import { validateBody } from '../middlewares/validate.middleware';
import { CreateFeedbackSchema } from '../dtos/feedback.dto';

const router = Router();

router.post('/', validateBody(CreateFeedbackSchema), (req, res, next) => {
  feedbackController.create(req, res, next);
});

router.get('/', (req, res, next) => {
  feedbackController.getAll(req, res, next);
});

router.get('/project/:projectId', (req, res, next) => {
  feedbackController.getByProjectId(req, res, next);
});

export default router;
