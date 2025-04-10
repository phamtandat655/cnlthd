
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,  //Đặt JwtModule là module toàn cục, không cần import lại ở nơi khác.
      secret: "JWT secret",  // Khóa bí mật dùng để mã hóa token
      signOptions: { expiresIn: '60s' }, // Token sẽ hết hạn sau 60 giây 
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
