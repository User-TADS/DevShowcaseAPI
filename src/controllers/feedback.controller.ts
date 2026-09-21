import { Request, Response, NextFunction } from 'express';
import { feedbackRepository } from '../repositories/feedback.repository';
import { projectRepository } from '../repositories/project.repository';
import { CreateFeedbackDTO } from '../dtos/feedback.dto';

export class FeedbackController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: CreateFeedbackDTO = req.body;

      const project = await projectRepository.findById(data.projectId);
      if (!project) {
        res.status(404).json({
          status: 'error',
          statusCode: 404,
          message: `Projeto com ID '${data.projectId}' não foi encontrado.`,
        });
        return;
      }

      const feedback = await feedbackRepository.create(data);
      res.status(201).json({
        status: 'success',
        statusCode: 201,
        message: 'Feedback registrado com sucesso!',
        data: feedback,
      });
    } catch (error) {
      next(error);
    }
  }

  async getByProjectId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { projectId } = req.params;
      const feedbacks = await feedbackRepository.findByProjectId(projectId);
      res.status(200).json({
        status: 'success',
        statusCode: 200,
        count: feedbacks.length,
        data: feedbacks,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const feedbacks = await feedbackRepository.findAll();
      res.status(200).json({
        status: 'success',
        statusCode: 200,
        count: feedbacks.length,
        data: feedbacks,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const feedbackController = new FeedbackController();
