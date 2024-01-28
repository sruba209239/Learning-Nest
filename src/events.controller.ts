import { Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";

@Controller('/events')
export class EventsController {
    @Get()
    findAll() { }

    @Get(':id')
    findOne(@Param('id') id) {
        return id;
    }

    @Post()
    create() { }

    @Patch(':id')
    update(@Param('id') id) {
        return "patch " + id;
    }

    @Delete(':id')
    delete(@Param('id') id) {
        return "delete " + id;
    }
}