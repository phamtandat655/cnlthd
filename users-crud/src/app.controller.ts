import { Controller, Get } from '@nestjs/common';// Import Controller và Get từ @nestjs/common để tạo một API controller
import { AppService } from './app.service';// Import AppService để sử dụng trong controller

@Controller()// Đánh dấu class là một Controller, xử lý các request đến API

export class AppController {
  constructor(private readonly appService: AppService) {}// Inject AppService vào Controller để sử dụng các phương thức trong service

  @Get()// Định nghĩa một endpoint GET tại đường dẫn mặc định "/"

  getHello(): string {
    return this.appService.getHello();// Gọi phương thức getHello() từ AppService để trả về chuỗi "Hello World!"
  }
}
