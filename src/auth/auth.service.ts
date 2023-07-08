import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { ReturnUserDTO } from '../user/DTO/return-user.dto';
import { UserEntity } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { LoginAuthDTO } from './DTO/login-auth.dto';
import { LoginPayLoadDTO } from './DTO/loginPayload.dto';
import { ReturnLogin } from './DTO/return-login.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login({ email, password }: LoginAuthDTO): Promise<ReturnLogin> {
    const user: UserEntity | undefined = await this.userService
      .findUserByEmail(email)
      .catch(() => undefined);

    const isMatch = await compare(password, user?.password || '');

    if (!user || !isMatch) {
      throw new NotFoundException('Email or  password invalid');
    }
    return {
      accessToken: this.jwtService.sign({ ...new LoginPayLoadDTO(user) }),
      user: new ReturnUserDTO(user),
    };
  }
}
