import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles.enum';
import { RolesGuard } from '../auth/roles.guard';
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
