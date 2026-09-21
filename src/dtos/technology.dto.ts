import { z } from 'zod';

export const CreateTechnologySchema = z.object({
  name: z
    .string({ required_error: 'O nome da tecnologia é obrigatório' })
    .trim()
    .min(1, 'O nome da tecnologia não pode estar vazio'),
  category: z.string().trim().optional(),
});

export type CreateTechnologyDTO = z.infer<typeof CreateTechnologySchema>;

export interface TechnologyResponseDTO {
  id: string;
  name: string;
  category?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
