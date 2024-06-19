import { z } from 'zod';

export const reserveSpotsSchema = z.object({
  spots: z.array(z.string()).nonempty(),
  ticketKind: z.enum(['full', 'half']),
});
