import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  UsePipes,
  UseFilters,
} from '@nestjs/common';

import { CreateEventRequest } from './request/create-event.request';
import { UpdateEventRequest } from './request/update-event.request';
import { ReserveSpotRequest } from './request/reserve-spot.request';
import { ZodValidationPipe } from '../../validator/ZodValidationPipe';
import { createEventSchema } from './validator/create-event.schema-validator';
import { reserveSpotsSchema } from './validator/reserve-spots.schema-validator';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';
import { UseZodGuard } from 'nestjs-zod';
import { AuthGuard } from '../auth/auth.guard';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseFilters(new HttpExceptionFilter())
  @UsePipes(new ZodValidationPipe(createEventSchema))
  create(@Body() createEventRequest: CreateEventRequest) {
    return this.eventsService.create(createEventRequest);
  }

  @Get()
  @UseFilters(new HttpExceptionFilter())
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  @UseFilters(new HttpExceptionFilter())
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  @UseFilters(new HttpExceptionFilter())
  update(
    @Param('id') id: string,
    @Body() updateEventRequest: UpdateEventRequest,
  ) {
    return this.eventsService.update(id, updateEventRequest);
  }

  @HttpCode(204)
  @UseFilters(new HttpExceptionFilter())
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }

  @UseGuards(AuthGuard)
  @UseFilters(new HttpExceptionFilter())
  @UseZodGuard('body', reserveSpotsSchema)
  @Post(':id/reserve')
  reserveSpots(
    @Param('id') id: string,
    @Body() reserveSpotRequest: ReserveSpotRequest,
  ) {
    return this.eventsService.reserveSpot({
      ...reserveSpotRequest,
      eventId: id,
    });
  }
}
