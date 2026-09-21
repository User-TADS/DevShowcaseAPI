import { prisma } from '../lib/prisma';

export async function resetAndSeedDatabase() {
  // Limpar tabelas
  await prisma.feedback.deleteMany();
  await prisma.project.deleteMany();
  await prisma.technology.deleteMany();
  await prisma.profile.deleteMany();

  // 1. Criar Tecnologias
  const techNode = await prisma.technology.create({
    data: { name: 'Node.js', category: 'Backend' },
  });
  const techExpress = await prisma.technology.create({
    data: { name: 'Express', category: 'Backend' },
  });
  const techTS = await prisma.technology.create({
    data: { name: 'TypeScript', category: 'Linguagem' },
  });
  const techPrisma = await prisma.technology.create({
    data: { name: 'Prisma ORM', category: 'ORM / Database' },
  });
  const techSQLite = await prisma.technology.create({
    data: { name: 'SQLite', category: 'Database' },
  });
  const techReact = await prisma.technology.create({
    data: { name: 'React', category: 'Frontend' },
  });
  const techDocker = await prisma.technology.create({
    data: { name: 'Docker', category: 'DevOps' },
  });

  // 2. Criar Perfis
  const profileGuilherme = await prisma.profile.create({
    data: {
      name: 'Guilherme Barbosa',
      email: 'guilherme.barbosa@example.com',
      bio: 'Desenvolvedor Full Stack apaixonado por arquiteturas escaláveis e APIs RESTful.',
      githubUrl: 'https://github.com/guilhermebarbosa',
    },
  });

  const profileBeatriz = await prisma.profile.create({
    data: {
      name: 'Beatriz Lima',
      email: 'beatriz.lima@example.com',
      bio: 'Engenheira de Software Backend com foco em microserviços e alta performance.',
      githubUrl: 'https://github.com/beatrizlima',
    },
  });

  // 3. Criar Projetos
  const projectDevShowcase = await prisma.project.create({
    data: {
      title: 'DevShowcase API',
      description: 'Plataforma para compartilhamento e avaliação de portfólios de desenvolvedores com persistência relacional.',
      repositoryUrl: 'https://github.com/guilhermebarbosa/devshowcase-api',
      liveUrl: 'https://devshowcase.example.com',
      profileId: profileGuilherme.id,
      technologies: {
        connect: [
          { id: techNode.id },
          { id: techExpress.id },
          { id: techTS.id },
          { id: techPrisma.id },
          { id: techSQLite.id },
        ],
      },
    },
  });

  const projectMicroservices = await prisma.project.create({
    data: {
      title: 'E-Commerce Cloud Architecture',
      description: 'Arquitetura de microsserviços para e-commerce com mensageria e containers.',
      repositoryUrl: 'https://github.com/beatrizlima/ecommerce-cloud',
      liveUrl: 'https://ecommerce.example.com',
      profileId: profileBeatriz.id,
      technologies: {
        connect: [{ id: techNode.id }, { id: techTS.id }, { id: techDocker.id }],
      },
    },
  });

  // 4. Criar Feedbacks
  await prisma.feedback.create({
    data: {
      author: 'Prof. Avaliador',
      content: 'Excelente arquitetura em camadas, persistência relacional robusta e documentação impecável!',
      rating: 5,
      projectId: projectDevShowcase.id,
    },
  });

  await prisma.feedback.create({
    data: {
      author: 'Tech Lead Reviewer',
      content: 'Padrão Repository bem implementado e validações completas com Zod.',
      rating: 5,
      projectId: projectDevShowcase.id,
    },
  });

  return {
    profilesCount: 2,
    technologiesCount: 7,
    projectsCount: 2,
    feedbacksCount: 2,
  };
}

export async function cleanDatabase() {
  await prisma.feedback.deleteMany();
  await prisma.project.deleteMany();
  await prisma.technology.deleteMany();
  await prisma.profile.deleteMany();
}
