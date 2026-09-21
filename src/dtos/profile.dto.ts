import { z } from 'zod';

export const CreateProfileSchema = z.object({
  name: z
    .string({ required_error: 'O nome é obrigatório' })
    .trim()
    .min(2, 'O nome deve conter pelo menos 2 caracteres'),
  email: z
    .string({ required_error: 'O e-mail é obrigatório' })
    .trim()
    .email('Formato de e-mail inválido'),
  bio: z.string().trim().optional(),
  githubUrl: z
    .string()
    .trim()
    .url('A URL do GitHub deve ser uma URL válida (ex: https://github.com/usuario)')
    .optional()
    .or(z.literal('')),
});

export type CreateProfileDTO = z.infer<typeof CreateProfileSchema>;

export interface ProfileResponseDTO {
  id: string;
  name: string;
  email: string;
  bio?: string | null;
  githubUrl?: string | null;
  projects?: any[];
  createdAt: Date;
  updatedAt: Date;
}
