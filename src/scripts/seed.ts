import { prisma } from '../lib/prisma';

async function main() {
  console.log('🌱 Iniciando povoamento inicial do banco de dados (Seed)...');

  // Limpar tabelas mantendo integridade
  await prisma.feedback.deleteMany();
  await prisma.project.deleteMany();
  await prisma.technology.deleteMany();
  await prisma.profile.deleteMany();

  console.log('🧹 Banco de dados limpo com sucesso.');

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

  console.log('✅ Tecnologias criadas: Node.js, Express, TypeScript, Prisma ORM, SQLite, React, Docker.');

  // 2. Criar Perfis de Desenvolvedores
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

  console.log('✅ Perfis criados: Guilherme Barbosa, Beatriz Lima.');

  // 3. Criar Projetos com relacionamentos (1:N com Profile, N:N com Technologies)
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

  console.log('✅ Projetos criados com vínculos relacionais.');

  // 4. Criar Feedbacks (1:N com Project)
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

  console.log('✅ Feedbacks associados aos projetos criados.');
  console.log('🎉 Povoamento concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante a execução do seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
