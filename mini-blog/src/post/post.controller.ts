// post.controller.ts
import { Controller, Post as HttpPost, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @HttpPost()
  create(@Body() dto: CreatePostDto,  @CurrentUser() user: any) {
    return this.postService.create(dto, user);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.postService.findByUser(+userId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePostDto, @CurrentUser() user: any) {
    return this.postService.update(+id, dto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.postService.remove(+id, user);
  }
}
