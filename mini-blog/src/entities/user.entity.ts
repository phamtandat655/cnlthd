import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { Profile } from './profile.entity';
import { Post } from './post.entity';
import { Comment } from './comment.entity'
import { Role } from 'src/auth/roles.enum';
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column({ enum: Role, default: Role.User})
    role: string;

    @OneToOne(() => Profile, profile => profile.user, {cascade: true, onDelete: 'SET NULL'})
    @JoinColumn()
    profile: Profile;

    @OneToMany(() => Post, post => post.user, {cascade: true})
    posts: Post[];

    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[];

}