import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { cityMock } from '../city/__mocks__/city.mock';
import { CityService } from '../city/city.service';
import { userEntityMock } from '../user/__mocks__/user-entity.mock';
import { UserService } from '../user/user.service';
import { addressMock } from './__mock__/address.mock';
import { createAddressDTOMock } from './__mock__/create-address-DTO.mock';
import { AddressService } from './address.service';
import { AddressEntity } from './entity/address.entity';

describe('AddressService', () => {
  let cityService: CityService;
  let userService: UserService;
  let addressService: AddressService;
  let addressRepository: Repository<AddressEntity>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: getRepositoryToken(AddressEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(addressMock),
            find: jest.fn().mockResolvedValue(addressMock),
          },
        },
        {
          provide: CityService,
          useValue: {
            getCityById: jest.fn().mockResolvedValue(cityMock),
          },
        },
        {
          provide: UserService,
          useValue: {
            getUserById: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
      ],
    }).compile();

    addressService = app.get<AddressService>(AddressService);
    addressRepository = app.get<Repository<AddressEntity>>(
      getRepositoryToken(AddressEntity),
    );
    cityService = app.get<CityService>(CityService);
    userService = app.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(addressRepository).toBeDefined();
    expect(addressService).toBeDefined();
    expect(cityService).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('createAddress', () => {
    it('should create an address when calling createAddress', async () => {
      const { id } = userEntityMock;
      const result = await addressService.createAddress(
        createAddressDTOMock,
        id,
      );
      expect(result).toEqual(addressMock);
    });

    it('should throw an error if getUserById throws an error', async () => {
      jest.spyOn(userService, 'getUserById').mockRejectedValueOnce(new Error());
      const { id } = userEntityMock;
      await expect(
        addressService.createAddress(createAddressDTOMock, id),
      ).rejects.toThrowError();
    });

    it('should throw an error if getCityById throws an error', async () => {
      jest.spyOn(cityService, 'getCityById').mockRejectedValueOnce(new Error());
      const { id } = userEntityMock;
      await expect(
        addressService.createAddress(createAddressDTOMock, id),
      ).rejects.toThrowError();
    });
  });

  describe('Read Address', () => {
    it('should get an address when calling getAddressById', async () => {
      const { id } = userEntityMock;
      const result = await addressService.getAddressById(id);
      expect(result).toEqual(addressMock);
    });
    it('should return error if the address is not found or empty', async () => {
      jest
        .spyOn(addressRepository, 'find')
        .mockRejectedValueOnce(NotFoundException);
      const { id } = userEntityMock;
      await expect(addressService.getAddressById(id)).rejects.toThrowError();
    });
  });
});
