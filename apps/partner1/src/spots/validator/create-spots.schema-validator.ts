import { z } from 'nestjs-zod/z';

export const createSpotSchema = z.object({
  name: z.string().max(255),
});
