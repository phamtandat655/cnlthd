// comment.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/comment.dto';
import { Post } from '../entities/post.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async create(dto: CreateCommentDto, currentUser: any): Promise<Comment> {
    const user = await this.userRepository.findOneBy({ id: currentUser.id });
    const post = await this.postRepository.findOneBy({ id: dto.postId });

    if (!user || !post) throw new NotFoundException('Không tìm thấy user hoặc post');

    const comment = this.commentRepository.create({
      content: dto.content,
      user,
      post,
    });

    return this.commentRepository.save(comment);
  }

  findByPost(postId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { post: { id: postId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }
}
