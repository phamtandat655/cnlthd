// post.service.ts
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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
async create(dto: CreatePostDto, currentUser: any): Promise<Post> {
    const user = await this.userRepository.findOneBy({ id: currentUser.id });
    if (!user) throw new NotFoundException('User không tồn tại');

    const categories = await this.categoryRepository.find({ where: { name: In(dto.category) }});
  
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

  async update(id: number, dto: UpdatePostDto, currentUser: any): Promise<Post> {
    const post = await this.postRepository.findOne({ where:{id} , relations: ['user']});
    if (!post) throw new NotFoundException('Không tìm thấy post');

    // Nếu không phải admin, phải là chủ sở hữu mới được sửa
    if (currentUser.role !== 'admin' && post.user.id !== currentUser.id) {
    throw new ForbiddenException('Bạn không thể chỉnh sửa post này');
    }
    const categories = await this.categoryRepository.find({ where: { name: In(dto.category) }});
    Object.assign(post, dto);
    post.category = categories;
    return this.postRepository.save(post);
  }

  async remove(id: number, currentUser: any): Promise<void> {

    const post = await this.postRepository.findOne({ where:{id} , relations: ['user']});
    if (!post) throw new NotFoundException('Không tìm thấy post');

     // Nếu không phải admin, phải là chủ sở hữu mới được sửa
    if (currentUser.role !== 'admin' && post.user.id !== currentUser.id) {
    throw new ForbiddenException('Bạn không thể xoá post này');
    }
    await this.postRepository.delete(id);
  }
}
