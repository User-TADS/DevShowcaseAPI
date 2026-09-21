import { prisma } from '../lib/prisma';
import { CreateFeedbackDTO } from '../dtos/feedback.dto';

export class FeedbackRepository {
  async create(data: CreateFeedbackDTO) {
    return prisma.feedback.create({
      data: {
        author: data.author,
        content: data.content,
        rating: data.rating,
        projectId: data.projectId,
      },
      include: {
        project: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  }

  async findByProjectId(projectId: string) {
    return prisma.feedback.findMany({
      where: { projectId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAll() {
    return prisma.feedback.findMany({
      include: {
        project: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}

export const feedbackRepository = new FeedbackRepository();
