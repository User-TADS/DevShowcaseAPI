import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import { requestLogger } from './middlewares/logger.middleware';
import { errorHandler } from './middlewares/error.middleware';

export const createApp = (): Application => {
  const app = express();

  // Middlewares essenciais
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Logger de requisições no console para fácil visualização
  app.use(requestLogger);

  // Rota raiz
  app.get('/', (req: Request, res: Response) => {
    res.json({
      message: 'Bem-vindo à DevShowcase API!',
      documentation: 'Acesse /api para ver a lista de rotas disponíveis.',
    });
  });

  // Rotas da API
  app.use('/api', routes);

  // Handler de rota não encontrada (404)
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      status: 'error',
      statusCode: 404,
      message: `Rota '${req.method} ${req.originalUrl}' não encontrada nesta API.`,
    });
  });

  // Middleware global de erros
  app.use(errorHandler);

  return app;
};

export const app = createApp();
export default app;
