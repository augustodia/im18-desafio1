import { PipeTransform } from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      console.log(typeof value);
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      throw new ZodError(error.issues);
    }
  }
}
