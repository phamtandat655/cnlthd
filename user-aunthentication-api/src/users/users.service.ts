import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
// Thực thể User thay thế cho class/interface ở ví dụ này 
export type User = any;

@Injectable()
export class UsersService {   // Tạo sẵn 1 list user đơn giản không sử dụng database
  private readonly users = [
    {
      username: 'john',
      password: 'changeme',
    },
    {
      username: 'maria',
      password: 'guess',
    },
  ];

  async createUser(username: string, password: string) {   // tạo user mới
    const hashedPassword = await bcrypt.hash(password, 10) as unknown as string;     //băm mật khẩu
    const user = { username, password: hashedPassword};
    this.users.push(user);
    return { username: user.username, password: user.password };    //trả về username và password
  }

  async findOne(username: string): Promise<User | undefined> {  //Tìm user theo tên
    return this.users.find(user => user.username === username);
  }

  async validateUser(username: string, password: string): Promise<boolean> {   // xác thực user
    const user = await this.findOne(username);
    if (!user) return false;
    return bcrypt.compare(password, user.password);
  }
}
