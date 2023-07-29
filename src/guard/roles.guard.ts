import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { LoginPayLoadDTO } from '../auth/DTO/loginPayload.dto';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const { authorization } = context.switchToHttp().getRequest().headers;
    const data = (authorization ?? ' ').split(' ')[1];
    console.log(data);
    const loginPayload: LoginPayLoadDTO | undefined = await this.jwtService
      .verifyAsync(data, {
        secret: process.env.JWT_SECRET,
      })
      .catch(() => undefined);

    if (!loginPayload) {
      return false;
    }
    console.log(authorization);
    return requiredRoles.some((role) => role === loginPayload.typeUser);
  }
}
