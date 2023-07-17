import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartProductService } from '../cart-product/cart-product.service';
import { returnDeleteMock } from '../product/__mocks__/return-delete.mock';
import { userEntityMock } from '../user/__mocks__/user-entity.mock';
import { cartMock } from './__mocks__/cart.mock';
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
            insertProductInCart: jest.fn().mockRejectedValue(undefined),
            deleteProductCart: jest.fn().mockRejectedValue(returnDeleteMock),
            updateProductInCart: jest.fn().mockRejectedValue(undefined),
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
  });
});
