import { Request, Response, NextFunction } from 'express';
import { technologyRepository } from '../repositories/technology.repository';
import { CreateTechnologyDTO } from '../dtos/technology.dto';

export class TechnologyController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: CreateTechnologyDTO = req.body;

      const existing = await technologyRepository.findByName(data.name);
      if (existing) {
        res.status(409).json({
          status: 'error',
          statusCode: 409,
          message: `A tecnologia '${data.name}' já está cadastrada.`,
        });
        return;
      }

      const technology = await technologyRepository.create(data);
      res.status(201).json({
        status: 'success',
        statusCode: 201,
        message: 'Tecnologia cadastrada com sucesso!',
        data: technology,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const technologies = await technologyRepository.findAll();
      res.status(200).json({
        status: 'success',
        statusCode: 200,
        count: technologies.length,
        data: technologies,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const technologyController = new TechnologyController();
