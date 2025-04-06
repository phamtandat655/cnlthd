import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity() //Tạo Table trong database
export class Todo {
    @PrimaryGeneratedColumn() //Tạo cột id tự động tăng
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;
    
    @Column({default: false}) //Tạo cột done với giá trị mặc định là false
    done: boolean;
}