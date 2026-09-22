import { prisma } from '../lib/prisma';

export async function resetDatabase() {
  await prisma.feedback.deleteMany();
  await prisma.project.deleteMany();
  await prisma.technology.deleteMany();
  await prisma.profile.deleteMany();

  console.log('\x1b[33m🧹 [Database] Todas as tabelas foram zeradas com sucesso (0 registros).\x1b[0m');

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
