import { Body, Controller, Post } from '@nestjs/common';
import { LoginAuthDTO } from './DTO/login-auth.dto';
import { ReturnLogin } from './DTO/return-login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  async login(@Body() loginDTO: LoginAuthDTO): Promise<ReturnLogin> {
    return await this.authService.login(loginDTO);
  }
}
