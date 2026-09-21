import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';
import { swaggerDocument } from './docs/swagger.spec';
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

  // Documentação Interativa com Swagger UI (/docs e /api-docs)
  const swaggerOptions = {
    customSiteTitle: 'DevShowcase API - Swagger UI',
    customCss: '.swagger-ui .topbar { display: none }',
  };

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

  // Redirecionamento amigável da rota raiz e /swagger diretamente para o Swagger UI
  app.get('/', (req: Request, res: Response) => {
    res.redirect('/docs');
  });

  app.get('/swagger', (req: Request, res: Response) => {
    res.redirect('/docs');
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
