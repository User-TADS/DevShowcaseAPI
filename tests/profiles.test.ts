import request from 'supertest';
import app from '../src/app';
import { prisma } from '../src/lib/prisma';

describe('Profile Endpoints (Testes de Perfil)', () => {
  beforeAll(async () => {
    await prisma.feedback.deleteMany();
    await prisma.project.deleteMany();
    await prisma.technology.deleteMany();
    await prisma.profile.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('deve cadastrar um novo perfil com sucesso (201)', async () => {
    const res = await request(app)
      .post('/api/profiles')
      .send({
        name: 'Guilherme Barbosa',
        email: 'guilherme.teste@example.com',
        bio: 'Desenvolvedor Full Stack',
        githubUrl: 'https://github.com/guilhermebarbosa',
      });

    expect(res.status).toBe(201);
    expect(res.body.status).toBe('success');
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.name).toBe('Guilherme Barbosa');
    expect(res.body.data.email).toBe('guilherme.teste@example.com');
  });

  it('deve falhar com 400 ao cadastrar perfil com e-mail inválido', async () => {
    const res = await request(app)
      .post('/api/profiles')
      .send({
        name: 'Nome Teste',
        email: 'email-invalido-sem-arroba',
      });

    expect(res.status).toBe(400);
    expect(res.body.status).toBe('error');
    expect(res.body.errors).toBeDefined();
  });

  it('deve falhar com 400 ao cadastrar perfil sem nome', async () => {
    const res = await request(app)
      .post('/api/profiles')
      .send({
        email: 'teste.semnome@example.com',
      });

    expect(res.status).toBe(400);
    expect(res.body.status).toBe('error');
  });

  it('deve falhar com 409 ao cadastrar perfil com e-mail já existente', async () => {
    const res = await request(app)
      .post('/api/profiles')
      .send({
        name: 'Guilherme Duplicado',
        email: 'guilherme.teste@example.com',
      });

    expect(res.status).toBe(409);
    expect(res.body.status).toBe('error');
  });

  it('deve buscar perfil por id existente com status 200', async () => {
    const created = await prisma.profile.create({
      data: {
        name: 'Maria Silva',
        email: 'maria.silva@example.com',
        bio: 'Dev Backend',
      },
    });

    const res = await request(app).get(`/api/profiles/${created.id}`);

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.id).toBe(created.id);
    expect(res.body.data.name).toBe('Maria Silva');
  });

  it('deve retornar 404 ao buscar perfil por id inexistente', async () => {
    const res = await request(app).get('/api/profiles/id-inexistente-12345');

    expect(res.status).toBe(404);
    expect(res.body.status).toBe('error');
  });
});
