import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { jwtConstants } from './auth.constants';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,  //Đặt JwtModule là module toàn cục, không cần import lại ở nơi khác.
      secret: jwtConstants.secret,  // Khóa bí mật dùng để mã hóa token
      signOptions: { expiresIn: '500s' }, // Token sẽ hết hạn sau 500 giây 
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,            // Áp dụng AuthGuard cho toàn bộ route ko có @Public
    },
  ],
  
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
