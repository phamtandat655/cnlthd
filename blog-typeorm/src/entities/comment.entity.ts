import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Post } from './post.entity';
@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @ManyToOne(() => Post, post => post.comments)
    post: Post;

}