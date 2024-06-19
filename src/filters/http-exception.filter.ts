import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { ZodValidationException } from 'nestjs-zod';
import { ZodError } from 'zod';
import { DomainValidationError } from '../errors/domain-validation.error';
import { PrismaError } from '../errors/prisma.error';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    console.log(exception);
    if (exception instanceof ZodValidationException) {
      return response.status(422).json({
        message: exception.getZodError().issues,
      });
    }

    if (exception instanceof ZodError) {
      return response.status(422).json({
        message: exception.issues,
      });
    }

    if (exception instanceof DomainValidationError) {
      if (exception.message.includes('not exists')) {
        return response.status(404).json({
          message: exception.message,
        });
      }

      return response.status(400).json({
        message: exception.message,
      });
    }

    if (exception instanceof PrismaError) {
      return response.status(400).json({
        message: exception.message,
      });
    }

    return response.status(500).json({
      message: 'Internal server error',
    });
  }
}
