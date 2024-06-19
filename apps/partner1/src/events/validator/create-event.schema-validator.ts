import { z } from 'zod';

export const createEventSchema = z.object({
  name: z.string().max(255),
  description: z.string().max(255),
  date: z.string().refine(
    (date) => {
      return new Date(date).toString() !== 'Invalid Date';
    },
    { message: 'Invalid date' },
  ),
  price: z.number().min(0),
});
