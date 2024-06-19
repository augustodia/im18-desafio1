import { type TicketKind } from '@prisma/client';

export class ReserveSpotRequest {
  spots: string[];
  ticketKind: TicketKind;
  email: string;
}
