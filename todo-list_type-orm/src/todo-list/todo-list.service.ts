import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/entities/todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from 'src/dto/create-todo.dto';
import { UpdateTodoDto } from 'src/dto/update-todo.dto';

@Injectable()
export class TodoListService {
    
    //Khai báo todoRepository là một biến của kiểu Repository<> với kiểu dữ liệu Todo
    constructor(@InjectRepository(Todo) private todoRepository: Repository<Todo>) {}

    //Hàm lấy danh sách todo
    async findAll(){
        return await this.todoRepository.find();
    }

    //Hàm lấy 1 todo theo id
    async findOne(id: number){
        return await this.todoRepository.findOne({
            where: {
                id, // => id: id <=> id(trong database) trùng với id(tham số truyền vào) 
            }
        });
    }

    //Hàm thêm 1 todo
    async create(dto: CreateTodoDto){
        return await this.todoRepository.save(dto);
    }

    //Hàm cập nhật 1 todo
    async update(id: number, dto: UpdateTodoDto){
        return await this.todoRepository.update(id, dto);
    }

    //Hàm xóa 1 todo
    async remove(id: number){
        return await this.todoRepository.delete(id);
    }
}
