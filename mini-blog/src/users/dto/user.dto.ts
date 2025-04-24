import { IsEnum, IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';
import { Role } from '../../auth/roles.enum';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

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