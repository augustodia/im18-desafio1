export class PrismaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PrismaError';
  }
}
