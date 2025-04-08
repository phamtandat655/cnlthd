import { NestFactory } from '@nestjs/core'; // Import NestFactory từ @nestjs/core để khởi tạo ứng dụng NestJS
import { AppModule } from './app.module'; // Import AppModule, module gốc của ứng dụng
async function bootstrap() {
  const app = await NestFactory.create(AppModule);// Tạo một ứng dụng NestJS từ AppModule
  await app.listen(process.env.PORT ?? 3000);// Lắng nghe trên cổng được cung cấp từ biến môi trường (process.env.PORT) hoặc mặc định là 3000
}

bootstrap(); // Gọi hàm bootstrap để khởi chạy ứng dụng
