import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { cartMock } from '../cart/__mocks__/cart.mock';
import { productMock } from '../product/__mocks__/product.mock';
import { returnDeleteMock } from '../product/__mocks__/return-delete.mock';
import { ProductService } from '../product/product.service';
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
});
