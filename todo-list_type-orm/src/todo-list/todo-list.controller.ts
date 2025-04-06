import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { CreateTodoDto } from 'src/dto/create-todo.dto';
import { UpdateTodoDto } from 'src/dto/update-todo.dto';
@Controller('todo')
export class TodoListController {

    constructor(private todoListService: TodoListService) {}

    @Get()
    async findAll(){
        return await this.todoListService.findAll();
    }

    @Get(':id')
    async findOne(id: number){
        return await this.todoListService.findOne(id);
    }

    @Post()
    async create(@Body() dto: CreateTodoDto){
        return await this.todoListService.create(dto);
    }

    @Patch(':id')
    async update(@Body() dto: UpdateTodoDto, @Param('id') id: number){
        return await this.todoListService.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number){
        return await this.todoListService.remove(id);
    }
}
