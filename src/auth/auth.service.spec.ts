import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { ReturnUserDTO } from '../user/DTO/return-user.dto';
import { userEntityMock } from '../user/__mocks__/user-entity.mock';
import { UserService } from '../user/user.service';
import { jwtMock } from './__mock__/jwt.mock';
import { loginUserMock } from './__mock__/login-user-mock';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findUserByEmail: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: () => jwtMock,
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(userService).toBeDefined();
  });
  describe('login method', () => {
    it('should return user if password and email valid', async () => {
      const user = await authService.login(loginUserMock);

      expect(user).toEqual({
        accessToken: jwtMock,
        user: new ReturnUserDTO(userEntityMock),
      });
    });
    it('should return user if password invalid and email valid', async () => {
      expect(
        authService.login({ ...loginUserMock, password: '4324' }),
      ).rejects.toThrowError();
    });
    it('should return user if email not exist', async () => {
      jest.spyOn(userService, 'findUserByEmail').mockResolvedValue(undefined);

      expect(authService.login(loginUserMock)).rejects.toThrowError();
    });
    it('should return error in UserService', async () => {
      jest.spyOn(userService, 'findUserByEmail').mockRejectedValue(new Error());

      expect(authService.login(loginUserMock)).rejects.toThrowError();
    });
  });
});
