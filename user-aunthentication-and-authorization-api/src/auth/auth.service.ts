
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(username: string, password: string, role: string) {
    return this.usersService.createUser(username, password, role);
  }

  async signIn( username: string, pass: string,): Promise<{ access_token: string }> {
    
    const user = await this.usersService.findOne(username);
    if ( !await this.usersService.signIn(username, pass) || !user) { // Kiểm tra sự tồn tại của user
      throw new UnauthorizedException('Sai username hoặc password');
    }
    
    const payload = { username: user.username, sub: user.id, role: user.role };

    return {
      access_token: await this.jwtService.signAsync(payload),   // Trả về token khi xác thực thành công
    };
  }
}
