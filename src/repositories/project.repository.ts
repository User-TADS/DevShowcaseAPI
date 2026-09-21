import { prisma } from '../lib/prisma';
import { CreateProjectDTO } from '../dtos/project.dto';

export class ProjectRepository {
  async create(data: CreateProjectDTO) {
    const technologyConnect = data.technologyIds && data.technologyIds.length > 0
      ? { connect: data.technologyIds.map((id) => ({ id })) }
      : undefined;

    return prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        repositoryUrl: data.repositoryUrl || null,
        liveUrl: data.liveUrl || null,
        profileId: data.profileId,
        technologies: technologyConnect,
      },
      include: {
        profile: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        technologies: {
          select: {
            id: true,
            name: true,
            category: true,
          },
        },
        feedbacks: true,
      },
    });
  }

  async findAll(filter?: { profileId?: string }) {
    return prisma.project.findMany({
      where: filter?.profileId ? { profileId: filter.profileId } : undefined,
      include: {
        profile: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        technologies: {
          select: {
            id: true,
            name: true,
            category: true,
          },
        },
        feedbacks: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return prisma.project.findUnique({
      where: { id },
      include: {
        profile: true,
        technologies: true,
        feedbacks: true,
      },
    });
  }
}

export const projectRepository = new ProjectRepository();
