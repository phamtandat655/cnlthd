import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './roles.enum';
import { ROLES_KEY } from './decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
// Hàm canActivate kiểm tra xem người dùng có vai trò phù hợp để truy cập route hay không
  canActivate(context: ExecutionContext): boolean {
    // Lấy danh sách các vai trò yêu cầu từ metadata của route
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // Nếu không có vai trò nào được yêu cầu (metadata không tồn tại), cho phép truy cập
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    // Lấy thông tin user từ request (thường được gán bởi AuthGuard trước đó)
    const user = request.user
    // Kiểm tra xem vai trò của user có nằm trong danh sách vai trò yêu cầu hay không
    return requiredRoles.includes(user.role)
  }
}
