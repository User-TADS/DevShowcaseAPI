import { Request, Response, NextFunction } from 'express';
import { projectRepository } from '../repositories/project.repository';
import { profileRepository } from '../repositories/profile.repository';
import { technologyRepository } from '../repositories/technology.repository';
import { CreateProjectDTO } from '../dtos/project.dto';

export class ProjectController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: CreateProjectDTO = req.body;

      // 1. Validar existência do perfil
      const profile = await profileRepository.findById(data.profileId);
      if (!profile) {
        res.status(404).json({
          status: 'error',
          statusCode: 404,
          message: `Perfil de desenvolvedor com ID '${data.profileId}' não foi encontrado.`,
        });
        return;
      }

      // 2. Validar existência das tecnologias (caso informadas)
      if (data.technologyIds && data.technologyIds.length > 0) {
        const foundTechs = await technologyRepository.findManyByIds(data.technologyIds);
        if (foundTechs.length !== data.technologyIds.length) {
          const foundIds = new Set(foundTechs.map((t) => t.id));
          const missingIds = data.technologyIds.filter((id) => !foundIds.has(id));
          res.status(400).json({
            status: 'error',
            statusCode: 400,
            message: `Tecnologias não encontradas: ${missingIds.join(', ')}`,
          });
          return;
        }
      }

      // 3. Criar projeto persistindo relacionamentos
      const project = await projectRepository.create(data);
      res.status(201).json({
        status: 'success',
        statusCode: 201,
        message: 'Projeto cadastrado com sucesso!',
        data: project,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profileId = req.query.profileId as string | undefined;
      const projects = await projectRepository.findAll({ profileId });
      res.status(200).json({
        status: 'success',
        statusCode: 200,
        count: projects.length,
        data: projects,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const project = await projectRepository.findById(id);

      if (!project) {
        res.status(404).json({
          status: 'error',
          statusCode: 404,
          message: `Projeto com ID '${id}' não foi encontrado.`,
        });
        return;
      }

      res.status(200).json({
        status: 'success',
        statusCode: 200,
        data: project,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const projectController = new ProjectController();
