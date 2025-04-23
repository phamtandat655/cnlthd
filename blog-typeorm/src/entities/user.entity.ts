import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { Profile } from './profile.entity';
import { Post } from './post.entity';
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile;

    @OneToMany(() => Post, post => post.user)
    posts: Post[];

}