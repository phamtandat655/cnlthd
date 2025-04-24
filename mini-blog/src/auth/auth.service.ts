
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  async signIn( username: string, pass: string,): Promise<{ access_token: string }> {
    
    const user = await this.usersService.findByUsername(username);
    if ( !await this.usersService.signIn(username, pass) || !user) { // Kiểm tra sự tồn tại của user
      throw new UnauthorizedException('Sai username hoặc password');
    }
    
    const payload = { username: user.username, sub: user.id, role: user.role };

    return {
      access_token: await this.jwtService.signAsync(payload),   // Trả về token khi xác thực thành công
    };
  }
}
