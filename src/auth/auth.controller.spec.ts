import { Test, TestingModule } from '@nestjs/testing';
import { loginUserMock } from './__mock__/login-user-mock';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { returnLoginMock } from './__mock__/return-login.mock';

describe('authController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue(returnLoginMock),
          },
        },
      ],
      controllers: [AuthController],
    }).compile();

    authController = app.get<AuthController>(AuthController);
    authService = app.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('login Method', () => {
    it('should return login user', async () => {
      const result = await authController.login(loginUserMock);
      expect(result).toEqual(returnLoginMock);
    });
  });
});
