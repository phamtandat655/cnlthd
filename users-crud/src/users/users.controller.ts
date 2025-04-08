import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common'; // Import các decorator từ @nestjs/common để định nghĩa Controller và các HTTP request handler

import { UsersService } from './users.service'; // Import UsersService để xử lý logic nghiệp vụ liên quan đến user

@Controller('users') // Định nghĩa route gốc cho controller này là '/users'
export class UsersController {
  constructor(private readonly usersService: UsersService) {} // Inject UsersService để sử dụng trong Controller

  @Post() // Xử lý yêu cầu HTTP POST tới '/users'
  create(@Body() createUserDto: any) { 
    // @Body() lấy dữ liệu từ body của request
    return this.usersService.create(createUserDto); // Gọi service để tạo user mới
  }

  @Get() // Xử lý yêu cầu HTTP GET tới '/users'
  findAll() {
    return this.usersService.findAll(); // Gọi service để lấy danh sách tất cả user
  }

  @Get(':id') // Xử lý yêu cầu HTTP GET tới '/users/:id' để lấy một user cụ thể theo ID
  findOne(@Param('id') id: string) { 
    // @Param('id') lấy giá trị ID từ URL
    return this.usersService.findOne(id); // Gọi service để tìm user theo ID
  }

  @Put(':id') // Xử lý yêu cầu HTTP PUT tới '/users/:id' để cập nhật user theo ID
  update(@Param('id') id: string, @Body() updateUserDto: any) { 
    // @Param('id') lấy ID từ URL, @Body() lấy dữ liệu cập nhật từ request body
    return this.usersService.update(id, updateUserDto); // Gọi service để cập nhật user
  }

  @Delete(':id') // Xử lý yêu cầu HTTP DELETE tới '/users/:id' để xóa user theo ID
  delete(@Param('id') id: string) { 
    // @Param('id') lấy ID từ URL
    return this.usersService.delete(id); // Gọi service để xóa user theo ID
  }
}
