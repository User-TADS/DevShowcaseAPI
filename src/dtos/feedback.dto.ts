import { z } from 'zod';

export const CreateFeedbackSchema = z.object({
  author: z
    .string({ required_error: 'O nome do autor do feedback é obrigatório' })
    .trim()
    .min(2, 'O nome do autor deve ter pelo menos 2 caracteres'),
  content: z
    .string({ required_error: 'O conteúdo do feedback é obrigatório' })
    .trim()
    .min(3, 'O feedback deve conter pelo menos 3 caracteres'),
  rating: z
    .number({ required_error: 'A avaliação (rating) é obrigatória' })
    .int('A avaliação deve ser um número inteiro')
    .min(1, 'A avaliação mínima é 1 estrela')
    .max(5, 'A avaliação máxima é 5 estrelas'),
  projectId: z
    .string({ required_error: 'O ID do projeto (projectId) é obrigatório' })
    .trim()
    .min(1, 'O projectId não pode estar vazio'),
});

export type CreateFeedbackDTO = z.infer<typeof CreateFeedbackSchema>;

export interface FeedbackResponseDTO {
  id: string;
  author: string;
  content: string;
  rating: number;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
}
