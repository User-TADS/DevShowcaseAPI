import { prisma } from '../lib/prisma';

/**
 * Limpa todas as tabelas do banco de dados SQLite, deixando o banco 100% zerado.
 */
export async function resetDatabase() {
  await prisma.feedback.deleteMany();
  await prisma.project.deleteMany();
  await prisma.technology.deleteMany();
  await prisma.profile.deleteMany();

  return {
    message: 'Todas as tabelas foram limpas com sucesso. O banco de dados está completamente zerado.',
    counts: {
      profiles: 0,
      projects: 0,
      technologies: 0,
      feedbacks: 0,
    },
  };
}

export const cleanDatabase = resetDatabase;
