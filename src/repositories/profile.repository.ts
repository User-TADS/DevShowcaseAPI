import { prisma } from '../lib/prisma';
import { CreateProfileDTO } from '../dtos/profile.dto';

export class ProfileRepository {
  async create(data: CreateProfileDTO) {
    return prisma.profile.create({
      data: {
        name: data.name,
        email: data.email,
        bio: data.bio || null,
        githubUrl: data.githubUrl || null,
      },
    });
  }

  async findById(id: string) {
    return prisma.profile.findUnique({
      where: { id },
      include: {
        projects: {
          include: {
            technologies: true,
            feedbacks: true,
          },
        },
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.profile.findUnique({
      where: { email },
    });
  }

  async findAll() {
    return prisma.profile.findMany({
      include: {
        projects: {
          include: {
            technologies: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}

export const profileRepository = new ProfileRepository();
