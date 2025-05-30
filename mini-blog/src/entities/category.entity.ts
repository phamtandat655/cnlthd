import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';
@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @ManyToMany(() => Post, posts => posts.category)
    posts: Post[];
}
