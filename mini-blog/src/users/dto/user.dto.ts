import { IsEnum, IsString, MinLength } from 'class-validator';
import { Role } from '../../auth/roles.enum';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  profile: {
    fullname: "Nguyễn Văn A";
    bio: "Viết giới thiệu về bản thân ở đây";
  };

}

export class UpdateUserDto {
  @IsString()
  @MinLength(4)
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(Role)
  role: Role;
}