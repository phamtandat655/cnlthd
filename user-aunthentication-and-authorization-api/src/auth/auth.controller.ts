import { Body, Controller, Post, Request,
    HttpCode, HttpStatus, UseGuards, Get, 
    UsePipes,
    ValidationPipe} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SignInDto } from './dto/signin.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('register')           // Đăng ký user
  @UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true, transform: true}))
  async register(@Body() body: SignInDto) {
    return this.authService.register(body.username, body.password, body.role);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')       // Xác thực user
  async signIn(@Body() body: SignInDto) {      
    return this.authService.signIn(body.username, body.password);
  }

}
