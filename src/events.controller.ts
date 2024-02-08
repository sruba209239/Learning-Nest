import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { CreateEventDTO } from './create-event.dto';
import { UpdateEventDTO } from './update-event.dto';
import { Event } from './event.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('/events')
export class EventsController {
  constructor(
    @InjectRepository(Event)
    private repository: Repository<Event>
  ) {}

  @Get()
  async findAll() {
    return await this.repository.find();
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    return (await this.repository.findBy({ id: id })) ?? "Event doesn't exist";
  }

  @Post()
  create(@Body() input: CreateEventDTO) {
    this.repository.save({
      ...input,
      when: new Date(input.when)
    });
    return input;
  }

  @Patch(':id')
  async update(@Param('id') id, @Body() input: UpdateEventDTO) {
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
