// post.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Post } from '../entities/post.entity';
import { User } from '../entities/user.entity';
import { In, Repository } from 'typeorm';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(
  @InjectRepository(Post) private postRepository: Repository<Post>,
  @InjectRepository(User) private userRepository: Repository<User>,
  @InjectRepository(Category) private categoryRepository: Repository<Category>,
) {}

  // post.service.ts (phần tạo post)
async create(dto: CreatePostDto): Promise<Post> {
    const user = await this.userRepository.findOneBy({ id: dto.userId });
    if (!user) throw new NotFoundException('User không tồn tại');
  
    const categories = await this.categoryRepository.findBy({ id: In(dto.categoryIds) });
  
    const post = this.postRepository.create({
      title: dto.title,
      content: dto.content,
      user,
      category: categories,
    });
  
    return this.postRepository.save(post);
  }
  

  findAll(): Promise<Post[]> {
    return this.postRepository.find({ relations: ['user'] });
  }

  findByUser(userId: number): Promise<Post[]> {
    return this.postRepository.find({ where: { user: { id: userId } }, relations: ['user'] });
  }

  async update(id: number, dto: UpdatePostDto): Promise<Post> {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) throw new NotFoundException('Không tìm thấy post');

    Object.assign(post, dto);
    return this.postRepository.save(post);
  }

  async remove(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}
