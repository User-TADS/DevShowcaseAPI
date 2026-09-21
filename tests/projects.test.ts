import request from 'supertest';
import app from '../src/app';
import { prisma } from '../src/lib/prisma';

describe('Project Endpoints (Testes de Projeto)', () => {
  let testProfileId: string;
  let testTechId1: string;
  let testTechId2: string;

  beforeAll(async () => {
    await prisma.feedback.deleteMany();
    await prisma.project.deleteMany();
    await prisma.technology.deleteMany();
    await prisma.profile.deleteMany();

    const profile = await prisma.profile.create({
      data: {
        name: 'Carlos Oliveira',
        email: 'carlos.dev@example.com',
      },
    });
    testProfileId = profile.id;

    const tech1 = await prisma.technology.create({
      data: { name: 'Express.js', category: 'Backend' },
    });
    testTechId1 = tech1.id;

    const tech2 = await prisma.technology.create({
      data: { name: 'SQLite', category: 'Database' },
    });
    testTechId2 = tech2.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('deve cadastrar um novo projeto com sucesso relacionando perfil e tecnologias (201)', async () => {
    const res = await request(app)
      .post('/api/projects')
      .send({
        title: 'DevShowcase Platform',
        description: 'Backend construído em Node.js com arquitetura limpa.',
        repositoryUrl: 'https://github.com/carlos/devshowcase',
        liveUrl: 'https://devshowcase.app',
        profileId: testProfileId,
        technologyIds: [testTechId1, testTechId2],
      });

    expect(res.status).toBe(201);
    expect(res.body.status).toBe('success');
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.title).toBe('DevShowcase Platform');
    expect(res.body.data.profile.id).toBe(testProfileId);
    expect(res.body.data.technologies).toHaveLength(2);
  });

  it('deve falhar com 400 ao cadastrar projeto com título vazio', async () => {
    const res = await request(app)
      .post('/api/projects')
      .send({
        title: '',
        description: 'Descrição válida',
        profileId: testProfileId,
      });

    expect(res.status).toBe(400);
    expect(res.body.status).toBe('error');
  });

  it('deve falhar com 400 ao cadastrar projeto com URL inválida', async () => {
    const res = await request(app)
      .post('/api/projects')
      .send({
        title: 'Projeto URL Inválida',
        description: 'Descrição válida',
        repositoryUrl: 'url-invalida-sem-http',
        profileId: testProfileId,
      });

    expect(res.status).toBe(400);
    expect(res.body.status).toBe('error');
  });

  it('deve falhar com 404 ao cadastrar projeto com profileId inexistente', async () => {
    const res = await request(app)
      .post('/api/projects')
      .send({
        title: 'Projeto Fantasma',
        description: 'Descrição válida',
        profileId: 'perfil-inexistente-xyz',
      });

    expect(res.status).toBe(404);
    expect(res.body.status).toBe('error');
  });

  it('deve listar todos os projetos cadastrados com status 200', async () => {
    const res = await request(app).get('/api/projects');

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
    expect(res.body.data[0]).toHaveProperty('profile');
    expect(res.body.data[0]).toHaveProperty('technologies');
  });
});
