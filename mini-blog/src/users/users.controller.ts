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
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)    // Chỉ có admin mới được tạo user thủ công
    create(@Body() dto: CreateUserDto) {
      return this.usersService.create(dto);
    }
  
  
    @Get(':userId')
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)    // Chỉ có admin mới tìm user dựa trên ID
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
    @Roles(Role.Admin)    // Chỉ có admin mới xem được danh sách user
    @Get()
    getAllUser() {
        return this.usersService.findAll();
    }
}
