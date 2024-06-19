import { z } from 'zod';

export const reserveSpotsSchema = z.object({
  spots: z.array(z.string()).nonempty(),
  ticket_kind: z.enum(['full', 'half']),
});
