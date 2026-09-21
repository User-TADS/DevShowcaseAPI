import request from 'supertest';
import app from '../src/app';
import { prisma } from '../src/lib/prisma';

describe('Technology Endpoints (Testes de Tecnologia)', () => {
  beforeAll(async () => {
    await prisma.feedback.deleteMany();
    await prisma.project.deleteMany();
    await prisma.technology.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('deve cadastrar uma nova tecnologia com sucesso (201)', async () => {
    const res = await request(app)
      .post('/api/technologies')
      .send({
        name: 'Node.js',
        category: 'Backend',
      });

    expect(res.status).toBe(201);
    expect(res.body.status).toBe('success');
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.name).toBe('Node.js');
    expect(res.body.data.category).toBe('Backend');
  });

  it('deve falhar com 400 ao cadastrar tecnologia sem nome', async () => {
    const res = await request(app)
      .post('/api/technologies')
      .send({
        category: 'Frontend',
      });

    expect(res.status).toBe(400);
    expect(res.body.status).toBe('error');
  });

  it('deve falhar com 409 ao cadastrar tecnologia com nome duplicado', async () => {
    const res = await request(app)
      .post('/api/technologies')
      .send({
        name: 'Node.js',
        category: 'Runtime',
      });

    expect(res.status).toBe(409);
    expect(res.body.status).toBe('error');
  });

  it('deve listar todas as tecnologias com status 200', async () => {
    await prisma.technology.create({
      data: { name: 'TypeScript', category: 'Linguagem' },
    });

    const res = await request(app).get('/api/technologies');

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(2);
  });
});
