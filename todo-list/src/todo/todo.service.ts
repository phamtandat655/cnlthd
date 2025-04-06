import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todo.model';

@Injectable()
export class TodoService {
    //Gọi là một mảng Todo chứa các todo
    private todos: Todo[] = [];
    //Này là để tự tăng số id cho mỗi todo, set sẵn là 1 để bắt đầu từ 0
    private CounterId = 0;

    //Tìm tất cả todo
    findAll(){
        //Trả về mảng todos
        return this.todos;
    }

    //Tìm 1 todo theo id
    findOne(id: number): Todo{
        //Tạo 1 todo mới, tìm todo trong mảng todos theo id
        const todo = this.todos.find(todo => todo.id === id);
        //Không tìm thấy todo thì báo lỗi
        if(!todo){
            throw new NotFoundException('Could not find todo');
        }
        return todo; //Trả về todo đã tìm thấy
    }

    //Tạo 1 todo mới với title, description, done đã được định nghĩa kiểu dữ liệu sẵn
    create(title: string, description: string = '', done: boolean = false): Todo{
        //Tạo 1 todo mới với id, title, description, done đã được truyền vào
        const todo: Todo = {
            id: this.CounterId,
            title,
            description,
            done
        };
        //Thêm todo mới vào mảng todos
        this.todos.push(todo);
        //Tăng id cho todo tiếp theo
        this.CounterId++;
        //Trả về todo vừa tạo
        return todo;
    }
    
    //Xóa 1 todo theo id
    delete(id: number): string{
        //Tìm todo trong mảng todos theo id, trả về index của todo tức là vị trí của todo cần xóa
        const index = this.todos.findIndex((todo) => todo.id === id);
        //Không tìm thấy todo thì báo lỗi
        if(!index){
            throw new NotFoundException('Could not find todo');
        }
        //Xóa todo trong mảng todos
        //splice(index, 1) sẽ xóa 1 phần tử ở vị trí index
        //splice trả về mảng các phần tử đã xóa, nếu có phần tử đã xóa thì trả về 'Todo deleted', ngược lại trả về 'Could not delete todo'
        return this.todos.splice(index, 1).length > 0 ? 'Todo deleted' : 'Could not delete todo';
    }
}
