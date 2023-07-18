import { Test, TestingModule } from '@nestjs/testing';
import { returnDeleteMock } from '../product/__mocks__/return-delete.mock';
import { userEntityMock } from '../user/__mocks__/user-entity.mock';
import { cartMock } from './__mocks__/cart.mock';
import { insertCartMock } from './__mocks__/inset-cart.mock';
import { updateCartMock } from './__mocks__/update-cart.mock';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

describe('cartController', () => {
  let cartController: CartController;
  let cartService: CartService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CartService,
          useValue: {
            insertProductInCart: jest.fn().mockResolvedValue(cartMock),
            findCartByUserId: jest.fn().mockResolvedValue(cartMock),
            clearCart: jest.fn().mockResolvedValue(returnDeleteMock),
            updateProductInCart: jest.fn().mockResolvedValue(cartMock),
          },
        },
      ],
      controllers: [CartController],
    }).compile();

    cartController = app.get<CartController>(CartController);
    cartService = app.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(cartController).toBeDefined();
    expect(cartService).toBeDefined();
  });

  describe('createCart method', () => {
    it('should cart entity in insertProductInCart', async () => {
      const resolve = await cartController.createCart(
        insertCartMock,
        userEntityMock.id,
      );

      expect(resolve).toEqual({
        id: cartMock.id,
      });
    });
  });
  describe('findCartByUserId method', () => {
    it('should cart entity in findCartByUserId', async () => {
      const resolve = await cartController.findCartByUserId(userEntityMock.id);

      expect(resolve).toEqual({
        id: cartMock.id,
      });
    });
  });
  describe('clearCart method', () => {
    it('should return DeleteResult in clearCart', async () => {
      const resolve = await cartController.clearCart(userEntityMock.id);
      expect(resolve).toEqual(returnDeleteMock);
    });
  });
  describe('updateProductInCart method', () => {
    it('should cart entity in findCartByUserId', async () => {
      const resolve = await cartController.updateProductInCart(
        updateCartMock,
        userEntityMock.id,
      );
      expect(resolve).toEqual({
        id: cartMock.id,
      });
    });
  });
});
