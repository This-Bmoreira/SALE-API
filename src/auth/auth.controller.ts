import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBasicAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginAuthDTO } from './DTO/login-auth.dto';
import { ReturnLogin } from './DTO/return-login.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBasicAuth()
  @ApiOperation({ summary: 'User login and authentication' })
  @Post()
  async login(@Body() loginDTO: LoginAuthDTO): Promise<ReturnLogin> {
    return await this.authService.login(loginDTO);
  }
}
