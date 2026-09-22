import { prisma } from '../lib/prisma';

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
