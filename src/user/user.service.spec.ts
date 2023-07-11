import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserMock } from './__mocks__/create-user.mock';
import { userEntityMock } from './__mocks__/user-entity.mock';
import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(createUserMock),
            find: jest.fn().mockResolvedValue([userEntityMock]),
            findOne: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('Read user', () => {
    it('should return all users when calling getAllUser', async () => {
      const result = await userService.getAllUser();
      expect(result).toEqual([userEntityMock]);
    });

    it('should find user by email when calling findUserByEmail', async () => {
      const { email } = userEntityMock;
      const result = await userService.findUserByEmail(email);
      expect(result).toEqual(userEntityMock);
    });

    it('should throw an error when user is not found by email when calling findUserByEmail', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
      const { email } = userEntityMock;
      const result = userService.findUserByEmail(email);
      await expect(result).rejects.toThrowError('Email not Found');
    });

    it('should throw an error when there is a database error when calling findUserByEmail', async () => {
      jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());
      const { email } = userEntityMock;
      const result = userService.findUserByEmail(email);
      await expect(result).rejects.toThrowError();
    });

    it('should find user by id when calling getUserById', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(userEntityMock);
      const { id } = userEntityMock;
      const result = await userService.getUserById(id);
      expect(result).toEqual(userEntityMock);
    });

    it('should throw an error when user is not found by id when calling getUserById', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
      const { id } = userEntityMock;
      const result = userService.getUserById(id);
      await expect(result).rejects.toThrowError('User id not Found');
    });

    it('should throw an error when there is a database error when calling getUserById', async () => {
      jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());
      const { id } = userEntityMock;
      const result = userService.getUserById(id);
      await expect(result).rejects.toThrowError();
    });

    it('should find user by id with relations when calling getUserByIdUsingRelations', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(userEntityMock);
      const { id } = userEntityMock;
      const result = await userService.getUserByIdUsingRelations(id);
      expect(result).toEqual(userEntityMock);
    });
  });
  describe('create user', () => {
    it('should throw an error if user exists', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(userEntityMock);

      await expect(async () => {
        await userService.createUser(createUserMock);
      }).rejects.toThrow(BadRequestException);
    });
  });
});