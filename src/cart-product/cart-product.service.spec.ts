import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { cartMock } from '../cart/__mocks__/cart.mock';
import { insertCartMock } from '../cart/__mocks__/inset-cart.mock';
import { updateCartMock } from '../cart/__mocks__/update-cart.mock';
import { productMock } from '../product/__mocks__/product.mock';
import { returnDeleteMock } from '../product/__mocks__/return-delete.mock';
import { ProductService } from '../product/product.service';
import { cartProductEntityMock } from './__mock__/product-cart.mock';
import { CartProductService } from './cart-product.service';
import { CartProductEntity } from './entity/cart-product.entity';

describe('ProductService', () => {
  let cartProductService: CartProductService;
  let cartProductRepository: Repository<CartProductEntity>;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartProductService,
        {
          provide: getRepositoryToken(CartProductEntity),
          useValue: {
            save: jest.fn(),
            delete: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: ProductService,
          useValue: {
            findProductById: jest.fn(),
          },
        },
      ],
    }).compile();
    cartProductService = module.get<CartProductService>(CartProductService);
    cartProductRepository = module.get<Repository<CartProductEntity>>(
      getRepositoryToken(CartProductEntity),
    );
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(cartProductService).toBeDefined();
    expect(cartProductRepository).toBeDefined();
    expect(productService).toBeDefined();
  });

  describe('deleteProductCart method', () => {
    it('should delete a product from the cart', async () => {
      jest
        .spyOn(cartProductRepository, 'delete')
        .mockResolvedValue(returnDeleteMock);

      const { id: cartId } = cartMock;
      const { id: productId } = productMock;

      const result = await cartProductService.deleteProductCart(
        productId,
        cartId,
      );

      expect(result).toEqual(returnDeleteMock);
    });
    it('should return an error if there is an error deleting a product from the cart in the database', async () => {
      jest
        .spyOn(cartProductRepository, 'delete')
        .mockRejectedValue(new Error());

      const { id: cartId } = cartMock;
      const { id: productId } = productMock;

      const result = cartProductService.deleteProductCart(productId, cartId);

      await expect(result).rejects.toThrow();
    });
  });

  describe('createProductInCart method', () => {
    it('should create a product in the cart', async () => {
      jest
        .spyOn(cartProductRepository, 'save')
        .mockResolvedValue(cartProductEntityMock);

      const { id: cartId } = cartMock;

      const result = await cartProductService.createProductInCart(
        insertCartMock,
        cartId,
      );

      expect(result).toEqual(cartProductEntityMock);
    });

    it('should return an error if there is an error saving a product to the cart in the database', async () => {
      jest.spyOn(cartProductRepository, 'save').mockRejectedValue(new Error());

      const { id: cartId } = cartMock;

      const result = cartProductService.createProductInCart(
        insertCartMock,
        cartId,
      );

      await expect(result).rejects.toThrow();
    });
  });

  describe('updateProductInCart method', () => {
    it('should update a product in the cart if it exists', async () => {
      jest
        .spyOn(productService, 'findProductById')
        .mockResolvedValue(productMock);

      jest
        .spyOn(cartProductService, 'verifyProductInCart')
        .mockResolvedValue(cartProductEntityMock);

      jest
        .spyOn(cartProductRepository, 'save')
        .mockResolvedValue(cartProductEntityMock);

      const result = await cartProductService.updateProductInCart(
        updateCartMock,
        cartMock,
      );

      expect(result).toEqual(cartProductEntityMock);
    });
  });

  describe('verifyProductInCart method', () => {
    it('should return a product in the cart if it exists', async () => {
      jest
        .spyOn(cartProductRepository, 'findOne')
        .mockResolvedValue(cartProductEntityMock);

      const { id: cartId } = cartMock;
      const { id: productId } = productMock;

      const result = await cartProductService.verifyProductInCart(
        productId,
        cartId,
      );

      expect(result).toEqual(cartProductEntityMock);
    });

    it('should throw a NotFoundException if the product does not exist in the cart', async () => {
      jest.spyOn(cartProductRepository, 'findOne').mockResolvedValue(undefined);

      const { id: cartId } = cartMock;
      const { id: productId } = productMock;

      const result = cartProductService.verifyProductInCart(productId, cartId);

      await expect(result).rejects.toThrowError(NotFoundException);
    });

    it('should return an error if there is an error verifying a product in the cart from the database', async () => {
      jest
        .spyOn(cartProductRepository, 'findOne')
        .mockRejectedValue(new Error());

      const { id: cartId } = cartMock;
      const { id: productId } = productMock;

      const result = cartProductService.verifyProductInCart(productId, cartId);

      await expect(result).rejects.toThrow();
    });
  });

  describe('insertProductInCart method', () => {
    it('should sum the amount of a product in the cart if it exists', async () => {
      const saveSpy = jest
        .spyOn(cartProductRepository, 'save')
        .mockResolvedValue(cartProductEntityMock);
      jest
        .spyOn(productService, 'findProductById')
        .mockResolvedValue(productMock);
      jest
        .spyOn(cartProductService, 'verifyProductInCart')
        .mockResolvedValue(cartProductEntityMock);
      const result = await cartProductService.insertProductInCart(
        insertCartMock,
        cartMock,
      );
      expect(result).toEqual(cartProductEntityMock);
      expect(saveSpy.mock.calls[0][0]).toEqual({
        ...cartProductEntityMock,
        amount: cartProductEntityMock.amount + insertCartMock.amount,
      });
    });

    it('should create a product in the cart if it does not exist', async () => {
      const saveSpy = jest
        .spyOn(cartProductRepository, 'save')
        .mockResolvedValue(cartProductEntityMock);

      jest
        .spyOn(productService, 'findProductById')
        .mockResolvedValue(productMock);

      jest
        .spyOn(cartProductService, 'verifyProductInCart')
        .mockResolvedValue(undefined);

      jest
        .spyOn(cartProductRepository, 'save')
        .mockResolvedValue(cartProductEntityMock);

      const result = await cartProductService.insertProductInCart(
        insertCartMock,
        cartMock,
      );
      expect(result).toEqual(cartProductEntityMock);
      expect(saveSpy.mock.calls[0][0].amount).toEqual(insertCartMock.amount);
    });
  });
});
