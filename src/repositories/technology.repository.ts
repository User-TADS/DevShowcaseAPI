import { prisma } from '../lib/prisma';
import { CreateTechnologyDTO } from '../dtos/technology.dto';

export class TechnologyRepository {
  async create(data: CreateTechnologyDTO) {
    return prisma.technology.create({
      data: {
        name: data.name,
        category: data.category || null,
      },
    });
  }

  async findAll() {
    return prisma.technology.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: string) {
    return prisma.technology.findUnique({
      where: { id },
      include: {
        projects: true,
      },
    });
  }

  async findByName(name: string) {
    return prisma.technology.findUnique({
      where: { name },
    });
  }

  async findManyByIds(ids: string[]) {
    return prisma.technology.findMany({
      where: {
        id: { in: ids },
      },
    });
  }
}

export const technologyRepository = new TechnologyRepository();
