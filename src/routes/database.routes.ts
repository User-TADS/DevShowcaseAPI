import { Router, Request, Response, NextFunction } from 'express';
import { resetDatabase } from '../utils/database.util';

const router = Router();

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

export default router;
