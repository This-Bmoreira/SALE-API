import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { orderMock } from '../order/__mock__/order.mock';
import { productMock } from '../product/__mocks__/product.mock';
import { orderProductMock } from './__mocks__/order-product.mock';
import { OrderProductEntity } from './entity/order-product.entity';
import { OrderProductService } from './order-product.service';

describe('OrderProductService', () => {
  let service: OrderProductService;
  let orderProductRepository: Repository<OrderProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(OrderProductEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(orderProductMock),
          },
        },
        OrderProductService,
      ],
    }).compile();

    service = module.get<OrderProductService>(OrderProductService);
    orderProductRepository = module.get<Repository<OrderProductEntity>>(
      getRepositoryToken(OrderProductEntity),
    );
  });

  it('should be defined', () => {
    expect(orderProductRepository).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('createOrderProduct method', () => {
    it('should return order product in save', async () => {
      const spy = jest.spyOn(orderProductRepository, 'save');
      const result = await service.createOrderProduct(
        productMock.id,
        orderMock.id,
        orderProductMock.price,
        orderProductMock.amount,
      );
      expect(result).toEqual(orderProductMock);
      expect(spy.mock.calls[0][0].price).toEqual(orderProductMock.price);
      expect(spy.mock.calls[0][0].amount).toEqual(orderProductMock.amount);
      expect(spy.mock.calls[0][0].orderId).toEqual(orderMock.id);
      expect(spy.mock.calls[0][0].productId).toEqual(productMock.id);
    });
    it('should return exception in error DB', async () => {
      jest.spyOn(orderProductRepository, 'save').mockRejectedValue(new Error());

      // const spy = jest.spyOn(orderProductRepository, 'save');
      const result = service.createOrderProduct(
        productMock.id,
        orderMock.id,
        orderProductMock.price,
        orderProductMock.amount,
      );
      expect(result).rejects.toThrow();
    });
  });
});
