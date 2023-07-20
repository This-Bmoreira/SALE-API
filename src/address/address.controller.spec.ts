import { Test, TestingModule } from '@nestjs/testing';
import { userEntityMock } from '../user/__mocks__/user-entity.mock';
import { addressMock } from './__mock__/address.mock';
import { createAddressDTOMock } from './__mock__/create-address-DTO.mock';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';

describe('addressController', () => {
  let addressController: AddressController;
  let addressService: AddressService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AddressService,
          useValue: {
            createAddress: jest.fn().mockResolvedValue(addressMock),
            getAddressById: jest.fn().mockResolvedValue([addressMock]),
          },
        },
      ],
      controllers: [AddressController],
    }).compile();

    addressController = app.get<AddressController>(AddressController);
    addressService = app.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(addressService).toBeDefined();
    expect(addressController).toBeDefined();
  });

  describe('createAddress Method', () => {
    it('should address Entity in createAddress', async () => {
      const address = await addressController.createAddress(
        userEntityMock.id,
        createAddressDTOMock,
      );

      expect(address).toEqual(addressMock);
    });
  });

  describe('createAddress Method', () => {
    it('should address Entity in createAddress', async () => {
      const { complement, cep, numberAddress, id } = addressMock;
      const { id: userId } = userEntityMock;
      const address = await addressController.getAddressById(userId);

      expect(address).toEqual([
        {
          id,
          complement,
          numberAddress,
          cep,
        },
      ]);
    });
  });
});
