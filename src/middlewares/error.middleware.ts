import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('❌ Erro na aplicação:', error);

  // Tratamento de erros do Prisma
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      const target = (error.meta?.target as string[])?.join(', ') || 'campo';
      res.status(409).json({
        status: 'error',
        statusCode: 409,
        message: `Já existe um registro com este valor único (${target}).`,
      });
      return;
    }

    if (error.code === 'P2025') {
      res.status(404).json({
        status: 'error',
        statusCode: 404,
        message: 'Registro não encontrado no banco de dados.',
      });
      return;
    }

    if (error.code === 'P2003') {
      res.status(400).json({
        status: 'error',
        statusCode: 400,
        message: 'Chave estrangeira inválida ou entidade relacionada não existe.',
      });
      return;
    }
  }

  // Erro padrão
  res.status(500).json({
    status: 'error',
    statusCode: 500,
    message: error.message || 'Erro interno do servidor',
  });
};
