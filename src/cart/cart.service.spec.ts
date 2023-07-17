import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartProductService } from '../cart-product/cart-product.service';
import { returnDeleteMock } from '../product/__mocks__/return-delete.mock';
import { userEntityMock } from '../user/__mocks__/user-entity.mock';
import { cartMock } from './__mocks__/cart.mock';
import { insertCartMock } from './__mocks__/inset-cart.mock';
import { CartService } from './cart.service';
import { CartEntity } from './entity/cart.entity';

describe('ProductService', () => {
  let cartProductService: CartProductService;
  let cartRepository: Repository<CartEntity>;
  let cartService: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: getRepositoryToken(CartEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(cartMock),
            findOne: jest.fn().mockResolvedValue(cartMock),
          },
        },
        {
          provide: CartProductService,
          useValue: {
            insertProductInCart: jest.fn().mockResolvedValue(undefined),
            deleteProductCart: jest.fn().mockResolvedValue(returnDeleteMock),
            updateProductInCart: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    cartService = module.get<CartService>(CartService);
    cartProductService = module.get<CartProductService>(CartProductService);
    cartRepository = module.get<Repository<CartEntity>>(
      getRepositoryToken(CartEntity),
    );
  });

  it('should be defined', () => {
    expect(cartProductService).toBeDefined();
    expect(cartRepository).toBeDefined();
    expect(cartService).toBeDefined();
  });
  describe('clearCart method', () => {
    it('should return delete result and cart', async () => {
      const spy = jest.spyOn(cartRepository, 'save');

      const { id } = userEntityMock;
      const result = await cartService.clearCart(id);

      expect(result).toEqual(returnDeleteMock);
      expect(spy.mock.calls[0][0]).toEqual({
        ...cartMock,
        active: false,
      });
    });
    it('should return error in findOne undefined', async () => {
      jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);

      const { id } = userEntityMock;
      const result = cartService.clearCart(id);

      expect(result).rejects.toThrowError(NotFoundException);
    });
  });

  describe('findCartByUserId Method', () => {
    it('should return cart successfully (without sending relations)', async () => {
      const spy = jest.spyOn(cartRepository, 'findOne');
      const { id } = userEntityMock;
      const result = await cartService.findCartByUserId(id);

      expect(result).toEqual(cartMock);
      expect(spy.mock.calls[0][0].relations).toEqual(undefined);
    });

    it('should return cart successfully (with sent relations)', async () => {
      const spy = jest.spyOn(cartRepository, 'findOne');
      const { id } = userEntityMock;
      const result = await cartService.findCartByUserId(id, true);

      expect(result).toEqual(cartMock);
      expect(spy.mock.calls[0][0].relations).toEqual({
        cartProduct: {
          product: true,
        },
      });
    });

    it('should throw NotFoundException when cart is not found', async () => {
      jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);
      const { id } = userEntityMock;
      const result = cartService.findCartByUserId(id);

      await expect(result).rejects.toThrowError(NotFoundException);
    });
  });

  describe('createCart Method', () => {
    it('should save cart with correct information', async () => {
      const spy = jest.spyOn(cartRepository, 'save');
      const { id } = userEntityMock;
      const result = await cartService.createCart(id);

      expect(result).toEqual(cartMock);
      expect(spy.mock.calls[0][0]).toEqual({
        active: true,
        userId: id,
      });
    });
  });

  describe('insertProductInCart Method', () => {
    it('should return cart not found', async () => {
      jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);
      const spy = jest.spyOn(cartRepository, 'save');
      const spyCartProductService = jest.spyOn(
        cartProductService,
        'insertProductInCart',
      );

      const { id } = userEntityMock;
      const result = await cartService.insertProductInCart(insertCartMock, id);

      expect(result).toEqual(cartMock);
      expect(spy.mock.calls.length).toEqual(1);
      expect(spyCartProductService.mock.calls.length).toEqual(1);
    });

    it('should return cart found', async () => {
      const spy = jest.spyOn(cartRepository, 'save');
      const spyCartProductService = jest.spyOn(
        cartProductService,
        'insertProductInCart',
      );

      const { id } = userEntityMock;
      const result = await cartService.insertProductInCart(insertCartMock, id);

      expect(result).toEqual(cartMock);
      expect(spy.mock.calls.length).toEqual(0);
      expect(spyCartProductService.mock.calls.length).toEqual(1);
    });
  });
});
