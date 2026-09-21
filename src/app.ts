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

  // Redirecionamento amigável
  app.get('/swagger', (req: Request, res: Response) => {
    res.redirect('/docs');
  });

  // Rota raiz com links diretos
  app.get('/', (req: Request, res: Response) => {
    res.json({
      message: 'Bem-vindo à DevShowcase API!',
      swagger: 'Acesse http://localhost:3000/docs para abrir a documentação interativa Swagger.',
      resetDatabase: 'Você pode resetar o banco direto pelo Swagger em /docs na tag "Manutenção do Banco"!',
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
