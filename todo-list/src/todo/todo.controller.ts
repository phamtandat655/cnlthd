import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {

    constructor(private readonly todoService: TodoService) {}

    @Get()
    findAll(){
        return this.todoService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number){
        return this.todoService.findOne(id);
    }

    @Post()
    create(@Body('title') title: string, @Body('description') description?: string, @Body('done') done?: boolean)
    {
        return this.todoService.create(title, description, done);
    }

    @Delete(':id')
    delete(@Param('id') id: number){
        return this.todoService.delete(id);
    }
}
