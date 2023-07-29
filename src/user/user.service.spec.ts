import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserMock } from './__mocks__/create-user.mock';
import {
  updatePassWordInvalidMock,
  updatePassWordMock,
} from './__mocks__/update-user.mock';
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
            save: jest.fn().mockResolvedValue(userEntityMock),
            find: jest.fn().mockResolvedValue([userEntityMock]),
            findOne: jest.fn(),
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
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(userEntityMock);
      const { email } = userEntityMock;
      const result = await userService.findUserByEmail(email);
      expect(result).toEqual(userEntityMock);
    });

    it('should throw an error when user is not found by email when calling findUserByEmail', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
      const { email } = userEntityMock;
      const result = userService.findUserByEmail(email);
      expect(result).rejects.toThrowError(NotFoundException);
    });

    it('should throw an error when there is a database error when calling findUserByEmail', async () => {
      jest.spyOn(userRepository, 'findOne').mockRejectedValue(new Error());
      const { email } = userEntityMock;
      const result = userService.findUserByEmail(email);
      await expect(result).rejects.toThrow();
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
      expect(result).rejects.toThrowError(NotFoundException);
    });

    it('should throw an error when there is a database error when calling getUserById', async () => {
      jest.spyOn(userRepository, 'findOne').mockRejectedValue(new Error());
      const { id } = userEntityMock;
      const result = userService.getUserById(id);
      expect(result).rejects.toThrow();
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
      const result = userService.createUser(createUserMock);
      expect(result).rejects.toThrow(BadRequestException);
    });
    it('should create a new user when calling createAndSaveUser', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
      const result = await userService.createUser(createUserMock);
      expect(result).toBe(userEntityMock);
    });
  });
  describe('update password', () => {
    it('should update the password if the user exists and the last password is valid', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(userEntityMock);
      jest.spyOn(userRepository, 'save').mockResolvedValue(userEntityMock);
      const { id } = userEntityMock;
      const result = await userService.updatePassWord(updatePassWordMock, id);
      expect(result).toBe(userEntityMock);
    });

    it('should throw an error if the last password is invalid', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(userEntityMock);
      jest.spyOn(userRepository, 'save').mockResolvedValue(userEntityMock);
      const { id } = userEntityMock;
      const result = userService.updatePassWord(updatePassWordInvalidMock, id);
      expect(result).rejects.toThrowError(BadRequestException);
    });

    it('should throw an error if the user does not exist', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
      jest.spyOn(userRepository, 'save').mockResolvedValue(userEntityMock);
      const { id } = userEntityMock;
      const result = userService.updatePassWord(updatePassWordMock, id);
      expect(result).rejects.toThrowError(NotFoundException);
    });
  });
});
