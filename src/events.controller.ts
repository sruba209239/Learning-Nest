import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEventDTO } from './create-event.dto';

@Controller('/events')
export class EventsController {
  data = [
    {
      id: 2,
      name: 'john',
    },
    {
      id: 1,
      name: 'smith',
    },
  ];
  @Get()
  findAll() {
    return this.data;
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return this.data.find((el) => el.id === +id) ?? "Event doesn't exist";
  }

  @Post()
  create(@Body() input: CreateEventDTO) {
    return input;
  }

  @Patch(':id')
  update(@Param('id') id, @Body() input) {
    return input;
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id) {
    return 'delete ' + id;
  }
}
