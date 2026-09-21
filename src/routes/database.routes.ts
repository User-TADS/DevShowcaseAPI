import { Router, Request, Response, NextFunction } from 'express';
import { resetAndSeedDatabase, cleanDatabase } from '../utils/database.util';

const router = Router();

// POST /api/database/reset - Resetar e repovoar o banco com dados padrão
router.post('/reset', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await resetAndSeedDatabase();
    res.status(200).json({
      status: 'success',
      statusCode: 200,
      message: 'Banco de dados SQLite resetado e repovoado com dados iniciais com sucesso!',
      seeded: result,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/database/clean - Limpar todas as tabelas
router.post('/clean', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await cleanDatabase();
    res.status(200).json({
      status: 'success',
      statusCode: 200,
      message: 'Todas as tabelas do banco de dados foram limpas com sucesso!',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
