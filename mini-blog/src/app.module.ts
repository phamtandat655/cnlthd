import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from './profile/profile.module';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // hoặc 'mysql' tùy vào DB bạn sử dụng
      host: 'localhost',
      port: 5432, // Thay đổi nếu cần
      username: 'postgres', // Tên user DB
      password: '123', // Mật khẩu DB
      database: 'mini_blog', // Tên DB
      entities: [__dirname + '/**/*.entity{.ts,.js}'],  // đường dẫn thư mục chứa các entity
      synchronize: true, // Hãy cẩn thận với cái này trên production
      autoLoadEntities: true,
    }),
    UsersModule,
    AuthModule,
    ProfileModule,
    PostModule,
    CategoryModule,
    CommentModule,
  ],
})

export class AppModule {}
