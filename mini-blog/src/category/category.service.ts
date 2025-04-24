import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(dto: CreateCategoryDto): Promise<Category>{
    const category = this.categoryRepository.create(dto);
    return await this.categoryRepository.save(category);
  }

  async update(id: number,dto: CreateCategoryDto): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) throw new NotFoundException('Không tìm thấy category');

    Object.assign(category, dto);
    return await this.categoryRepository.save(category);
  }

  async remove(id: number) {
    return await this.categoryRepository.delete(id);
  }

  findAll() {
    return this.categoryRepository.find({ relations: ['posts'] });
  }

  findOne(id: number) {
    return this.categoryRepository.findOne({ where: { id }, relations: ['posts'] });
  }
}
