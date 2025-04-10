import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const { username, password } = req.body;

    const errors: string[] = [];  // Tạo mảng chứa lỗi

    if (username.length < 4) {
      errors.push('Username phải có ít nhất 4 ký tự');
    }

    if (password.length < 6) {
      errors.push('Password phải có ít nhất 6 ký tự.');
    }

    if (errors.length > 0) {           // Trả về lỗi nếu validate thất bại
      throw new BadRequestException({ message: 'Validation failed', errors });
    }
    next();
  }
}
