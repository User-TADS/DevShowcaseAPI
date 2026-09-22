import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';
import { swaggerDocument } from './docs/swagger.spec';
import { swaggerCustomCss, swaggerCustomJs } from './docs/swagger-ui.custom';
import { schemaPrismaSvg } from './docs/schema-prisma.svg';
import { requestLogger } from './middlewares/logger.middleware';
import { errorHandler } from './middlewares/error.middleware';

export const createApp = (): Application => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(requestLogger);

  app.get(['/docs/schema-prisma.svg', '/schema-prisma.svg'], (req: Request, res: Response) => {
    res.type('image/svg+xml').send(schemaPrismaSvg);
  });

  const swaggerOptions = {
    customSiteTitle: 'DevShowcase API - Swagger UI',
    customCss: swaggerCustomCss,
    customJsStr: swaggerCustomJs,
  };

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions as any));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions as any));

  app.get(['/', '/swagger'], (req: Request, res: Response) => {
    res.redirect('/docs');
  });

  app.use('/api', routes);

  app.use((req: Request, res: Response) => {
    res.status(404).json({
      status: 'error',
      statusCode: 404,
      message: `Rota '${req.method} ${req.originalUrl}' não encontrada nesta API.`,
    });
  });

  app.use(errorHandler);

  return app;
};

export const app = createApp();
export default app;
