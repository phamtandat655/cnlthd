// comment.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/comment.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() dto: CreateCommentDto, @CurrentUser() user: any) {
    return this.commentService.create(dto, user);
  }

  @Get('post/:postId')
  findByPost(@Param('postId') postId: string) {
    return this.commentService.findByPost(+postId);
  }
}
