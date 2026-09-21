import { Router } from 'express';
import { feedbackController } from '../controllers/feedback.controller';
import { validateBody } from '../middlewares/validate.middleware';
import { CreateFeedbackSchema } from '../dtos/feedback.dto';

const router = Router();

// POST /api/feedbacks - Cadastrar feedback para um projeto
router.post('/', validateBody(CreateFeedbackSchema), (req, res, next) => {
  feedbackController.create(req, res, next);
});

// GET /api/feedbacks - Listagem de todos os feedbacks
router.get('/', (req, res, next) => {
  feedbackController.getAll(req, res, next);
});

// GET /api/feedbacks/project/:projectId - Listar feedbacks de um projeto específico
router.get('/project/:projectId', (req, res, next) => {
  feedbackController.getByProjectId(req, res, next);
});

export default router;
