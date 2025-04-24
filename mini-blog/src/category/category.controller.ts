import { Controller, Post, Body, Get, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/category.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  
  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)  // Chỉ có admin mới có quyền tạo Category
  create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)  // Chỉ có admin mới có quyền sửa Category
  update(@Param('id') id: string, @Body() dto: CreateCategoryDto) {
    return this.categoryService.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)  // Chỉ có admin mới có quyền xoá Category
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
