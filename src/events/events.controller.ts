import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe
} from '@nestjs/common';
import { CreateEventDTO } from './create-event.dto';
import { UpdateEventDTO } from './update-event.dto';
import { Event } from './event.entity';
import { Like, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('/events')
export class EventsController {
  private logger = new Logger(EventsController.name);

  constructor(
    @InjectRepository(Event)
    private repository: Repository<Event>
  ) {}

  @Get()
  async findAll() {
    this.logger.log(`Hit the findAll route`);
    const events = await this.repository.find();
    this.logger.debug(`Found ${events.length} events`);
    return events;
  }

  @Get('/practice')
  async findPractice() {
    return await this.repository.find({
      select: ['id', 'when'],
      where: [
        { id: MoreThan(3), when: MoreThan(new Date('2021-02-12T13:00:00')) },
        {
          description: Like('%meet%')
        }
      ],
      take: 2,
      order: {
        id: 'DESC'
      }
    });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id);
    return (await this.repository.findBy({ id: id })) ?? "Event doesn't exist";
  }

  @Post()
  create(
    @Body(new ValidationPipe({ groups: ['create'] })) input: CreateEventDTO
  ) {
    this.repository.save({
      ...input,
      when: new Date(input.when)
    });
    return input;
  }

  @Patch(':id')
  async update(
    @Param('id') id,
    @Body(new ValidationPipe({ groups: ['update'] })) input: UpdateEventDTO
  ) {
    let rowToBeUpdated = await this.repository.findOneBy({ id: id });
    rowToBeUpdated = {
      ...rowToBeUpdated,
      ...input,
      when: input.when ? new Date(input.when) : rowToBeUpdated.when
    };
    this.repository.save(rowToBeUpdated);
    return rowToBeUpdated;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id) {
    const event = await this.repository.findBy({ id: id });
    await this.repository.remove(event);
  }
}
