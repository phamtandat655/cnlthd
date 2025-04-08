import { Injectable } from '@nestjs/common';// Import Injectable từ @nestjs/common để đánh dấu class này có thể được tiêm (inject) vào các thành phần khác

@Injectable()
export class AppService { // Định nghĩa một service có thể được tiêm vào các module hoặc controller khác
  getHello(): string {    // Phương thức getHello trả về một chuỗi kiểu string
    return 'Hello World!';// Trả về chuỗi "Hello World!" khi phương thức này được gọi
  }
}
