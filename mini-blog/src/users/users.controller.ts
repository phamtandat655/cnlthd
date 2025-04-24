import { Body, Controller, Post, Delete, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles.enum';
import { RolesGuard } from '../auth/roles.guard';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

  @Post()
    create(@Body() dto: CreateUserDto) {
      return this.usersService.create(dto);
    }
  
  
    @Get('user/:userId')
    findByUser(@Param('userId') userId: string) {
      return this.usersService.findOne(+userId);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
      return this.usersService.update(+id, dto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.usersService.remove(+id);
    }


    @UseGuards(RolesGuard)
    @Roles(Role.Admin)  // Chỉ có admin mới xem được danh sách user
    @Get()
    getProfile(@Req() req) {
        return req.user;
    }

    @UseGuards(RolesGuard)
    @Roles(Role.Admin)    // Chỉ có admin mới xem được danh sách user
    @Get("list")
    getAllUser() {
        return this.usersService.findAll();
    }
}
