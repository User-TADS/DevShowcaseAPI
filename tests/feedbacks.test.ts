import request from 'supertest';
import app from '../src/app';
import { prisma } from '../src/lib/prisma';

describe('Feedback Endpoints (Testes de Feedback)', () => {
  let testProjectId: string;

  beforeAll(async () => {
    await prisma.feedback.deleteMany();
    await prisma.project.deleteMany();
    await prisma.profile.deleteMany();

    const profile = await prisma.profile.create({
      data: {
        name: 'Aline Souza',
        email: 'aline.souza@example.com',
      },
    });

    const project = await prisma.project.create({
      data: {
        title: 'Sistema de Agendamento',
        description: 'App para clínicas e consultórios médicos.',
        profileId: profile.id,
      },
    });

    testProjectId = project.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('deve cadastrar um feedback para o projeto com sucesso (201)', async () => {
    const res = await request(app)
      .post('/api/feedbacks')
      .send({
        author: 'Cliente Alpha',
        content: 'Ótima interface e velocidade de resposta rápida!',
        rating: 5,
        projectId: testProjectId,
      });

    expect(res.status).toBe(201);
    expect(res.body.status).toBe('success');
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.rating).toBe(5);
    expect(res.body.data.projectId).toBe(testProjectId);
  });

  it('deve falhar com 400 ao enviar avaliação fora do intervalo 1-5', async () => {
    const res = await request(app)
      .post('/api/feedbacks')
      .send({
        author: 'Cliente Invalido',
        content: 'Nota fora da escala',
        rating: 10,
        projectId: testProjectId,
      });

    expect(res.status).toBe(400);
    expect(res.body.status).toBe('error');
  });

  it('deve falhar com 404 ao enviar feedback para projeto inexistente', async () => {
    const res = await request(app)
      .post('/api/feedbacks')
      .send({
        author: 'Cliente Desconhecido',
        content: 'Projeto sumiu',
        rating: 4,
        projectId: 'projeto-fantasma-999',
      });

    expect(res.status).toBe(404);
    expect(res.body.status).toBe('error');
  });

  it('deve listar os feedbacks de um projeto com status 200', async () => {
    const res = await request(app).get(`/api/feedbacks/project/${testProjectId}`);

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
  });
});
