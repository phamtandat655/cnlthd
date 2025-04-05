import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); // Ép kiểu để  sử dụng Express làm HTTP framework, thay vì Fastify (một framework HTTP khác mà NestJS hỗ trợ).

  // Cho phép phục vụ file tĩnh từ thư mục public
  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.enableCors(); // Cho phép kết nối từ trình duyệt

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
