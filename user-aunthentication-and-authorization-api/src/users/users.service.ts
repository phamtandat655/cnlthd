import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

export interface User {
  id: number;
  username: string;
  password: string;
  role: string;
}

@Injectable()
export class UsersService {   // Tạo sẵn 1 list user đơn giản không sử dụng database
  private readonly users: User[] = [];

  async createUser(username: string, password: string, role: string) {   // tạo user mới

    const userExists = this.findOne(username);
    if (await userExists) {
      throw new ConflictException('Username này đã tồn tại, tạo tài khoản thất bại');
    }
    const hashedPassword = await bcrypt.hash(password, 10) as unknown as string;     //băm mật khẩu
    const user = { id: Date.now(), username, password: hashedPassword, role};
    this.users.push(user);
    return { message: "Tạo tài khoản thành công" };    //Thông báo tạo thành công
  }

  async findOne(username: string): Promise<User | undefined> {  //Tìm user theo tên
    return this.users.find(user => user.username === username);
  }

  async findAll(): Promise<User[]>{
    return this.users;
  }

  async signIn(username: string, password: string): Promise<boolean> {   // xác thực user
    const user = await this.findOne(username);
    if (!user) return false;
    return bcrypt.compare(password, user.password);
  }
}
