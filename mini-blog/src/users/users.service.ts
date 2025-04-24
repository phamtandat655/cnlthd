import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto, UpdateUserDto } from 'src/users/dto/user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {   // tạo user mới

    const userExists = this.findByUsername(createUserDto.username);
    if (await userExists) {
      throw new ConflictException('Username này đã tồn tại, tạo tài khoản thất bại');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10) as unknown as string;  //băm mật khẩu
    createUserDto.password = hashedPassword;
    return this.usersRepository.save(createUserDto);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {   // cập nhật user

    const userExists = this.findByUsername(updateUserDto.username);
    if (await userExists) {
      throw new ConflictException('Username này đã tồn tại, vui lòng chọn username khác');
    }
    const hashedPassword = await bcrypt.hash(updateUserDto.password, 10) as unknown as string;     //băm mật khẩu
    updateUserDto.password = hashedPassword;
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async findByUsername(username: string): Promise<User | null> { //Tìm user theo tên
    return await this.usersRepository.findOneBy({ username });
  }

  async findOne(id: number): Promise<User | null>{ //Tìm user theo id
    return await this.usersRepository.findOneBy({ id });
  }

  async findAll(): Promise<User[]>{  //Lấy danh sách user
    return await this.usersRepository.find();
  }
  

  async signIn(username: string, password: string): Promise<boolean> {   // xác thực user
    const user = await this.findByUsername(username);
    if (!user) return false;
    return bcrypt.compare(password, user.password);
  }
}
