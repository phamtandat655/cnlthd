import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @UseGuards(RolesGuard)
    @Roles(Role.Admin, Role.User)  // Hàm chỉ được sử dụng khi có token
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
