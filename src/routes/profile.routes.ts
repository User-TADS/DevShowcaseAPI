import { Router } from 'express';
import { profileController } from '../controllers/profile.controller';
import { validateBody } from '../middlewares/validate.middleware';
import { CreateProfileSchema } from '../dtos/profile.dto';

const router = Router();

// POST /api/profiles - Cadastro de perfil com validações
router.post('/', validateBody(CreateProfileSchema), (req, res, next) => {
  profileController.create(req, res, next);
});

// GET /api/profiles/:id - Buscar perfil por ID com projetos relacionados
router.get('/:id', (req, res, next) => {
  profileController.getById(req, res, next);
});

// GET /api/profiles - Listagem de perfis
router.get('/', (req, res, next) => {
  profileController.getAll(req, res, next);
});

export default router;
