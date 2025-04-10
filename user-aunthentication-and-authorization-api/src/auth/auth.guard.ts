import { CanActivate, ExecutionContext,
  Injectable, UnauthorizedException, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate { // lớp guard kiểm tra quyền truy cập,
                                                //  triển khai interface CanActivate
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  // Hàm canActivate kiểm tra xem request có được phép truy cập route hay không
  async canActivate(context: ExecutionContext): Promise<boolean> { 
    // Lấy thông tin từ metadata để kiểm tra route có được đánh dấu là public hay không
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // Nếu route là public, cho phép truy cập mà không cần kiểm tra token
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest(); // lấy request từ context HTTP
    const token = this.extractTokenFromHeader(request);  // Trích xuất token từ header của request
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      // Sử dụng secret key từ auth.constants để giải mã token
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      
       // Gán payload (dữ liệu trong token) vào request để sử dụng trong route handlers
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    // Tách header Authorization thành 2 phần: type và token (ví dụ: "Bearer abcxyz")
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    // Kiểm tra nếu type là 'Bearer' thì trả về token, nếu không trả về undefined
    return type === 'Bearer' ? token : undefined;
  }
}
