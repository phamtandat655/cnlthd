// profile.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto, UpdateProfileDto } from './dto/profile.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(@Body() dto: CreateProfileDto, @CurrentUser() user: any) {
    return this.profileService.create(dto, user);
  }

  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProfileDto,  @CurrentUser() user: any) {
    return this.profileService.update(+id, dto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string,  @CurrentUser() user: any) {
    return this.profileService.remove(+id, user);
  }
}
