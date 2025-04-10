
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(username: string, password: string) {
    return this.usersService.createUser(username, password);
  }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const isValid = await this.usersService.validateUser(username, pass); // Kiểm tra sự tồn tại của user
    if (!isValid) {
      throw new UnauthorizedException('Sai username hoặc password');
    }
    const user = await this.usersService.findOne(username);
    const payload = { sub: user.password, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),   // Trả về token khi xác thực thành công
    };
  }
}
