import { Request, Response, NextFunction } from 'express';
import { profileRepository } from '../repositories/profile.repository';
import { CreateProfileDTO } from '../dtos/profile.dto';

export class ProfileController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: CreateProfileDTO = req.body;

      const existingProfile = await profileRepository.findByEmail(data.email);
      if (existingProfile) {
        res.status(409).json({
          status: 'error',
          statusCode: 409,
          message: `Já existe um perfil cadastrado com o e-mail: ${data.email}`,
        });
        return;
      }

      const profile = await profileRepository.create(data);
      res.status(201).json({
        status: 'success',
        statusCode: 201,
        message: 'Perfil de desenvolvedor cadastrado com sucesso!',
        data: profile,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const profile = await profileRepository.findById(id);

      if (!profile) {
        res.status(404).json({
          status: 'error',
          statusCode: 404,
          message: `Perfil com ID ${id} não foi encontrado.`,
        });
        return;
      }

      res.status(200).json({
        status: 'success',
        statusCode: 200,
        data: profile,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profiles = await profileRepository.findAll();
      res.status(200).json({
        status: 'success',
        statusCode: 200,
        count: profiles.length,
        data: profiles,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const profileController = new ProfileController();
