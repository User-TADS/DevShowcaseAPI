import { Router, Request, Response, NextFunction } from 'express';
import { resetDatabase } from '../utils/database.util';

const router = Router();

// POST /api/database/reset - Zerar e limpar todas as tabelas do banco de dados
router.post('/reset', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await resetDatabase();
    res.status(200).json({
      status: 'success',
      statusCode: 200,
      message: result.message,
      data: result.counts,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/database/clean - Alias para limpeza do banco
router.post('/clean', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await resetDatabase();
    res.status(200).json({
      status: 'success',
      statusCode: 200,
      message: result.message,
      data: result.counts,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
