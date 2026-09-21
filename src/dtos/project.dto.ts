import { z } from 'zod';

export const CreateProjectSchema = z.object({
  title: z
    .string({ required_error: 'O título do projeto é obrigatório' })
    .trim()
    .min(1, 'O título não pode estar vazio'),
  description: z
    .string({ required_error: 'A descrição do projeto é obrigatória' })
    .trim()
    .min(3, 'A descrição deve conter pelo menos 3 caracteres'),
  repositoryUrl: z
    .string()
    .trim()
    .url('A URL do repositório deve ser válida (ex: https://github.com/usuario/repo)')
    .optional()
    .or(z.literal('')),
  liveUrl: z
    .string()
    .trim()
    .url('A URL do projeto em produção deve ser válida (ex: https://meuprojeto.com)')
    .optional()
    .or(z.literal('')),
  profileId: z
    .string({ required_error: 'O ID do perfil do desenvolvedor (profileId) é obrigatório' })
    .trim()
    .min(1, 'O profileId não pode estar vazio'),
  technologyIds: z.array(z.string().trim()).optional().default([]),
});

export type CreateProjectDTO = z.infer<typeof CreateProjectSchema>;

export interface ProjectResponseDTO {
  id: string;
  title: string;
  description: string;
  repositoryUrl?: string | null;
  liveUrl?: string | null;
  profileId: string;
  profile?: {
    id: string;
    name: string;
    email: string;
  };
  technologies?: {
    id: string;
    name: string;
    category?: string | null;
  }[];
  feedbacks?: {
    id: string;
    author: string;
    content: string;
    rating: number;
    createdAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
