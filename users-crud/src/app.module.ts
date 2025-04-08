import { Module } from '@nestjs/common'; // Import decorator @Module từ @nestjs/common để định nghĩa module trong NestJS
import { MongooseModule } from '@nestjs/mongoose'; // Import MongooseModule để tích hợp MongoDB với NestJS
import { UsersModule } from './users/users.module'; // Import UsersModule để quản lý user

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Main'), // Kết nối với MongoDB tại địa chỉ 'mongodb://localhost:27017/Main', tùy chỉnh theo địa chỉ MongoDB của bạn
    UsersModule, // Import UsersModule để module này có thể sử dụng các dịch vụ liên quan đến user
  ],
})
export class AppModule {} // Định nghĩa AppModule, đây là module gốc của ứng dụng
