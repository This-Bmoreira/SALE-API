import { Test, TestingModule } from '@nestjs/testing';
import { userEntityMock } from '../user/__mocks__/user-entity.mock';
import { createOrderPixMock } from './__mock__/create-order.mock';
import { orderMock } from './__mock__/order.mock';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: OrderService,
          useValue: {
            createOrder: jest.fn().mockReturnValue(orderMock),
            findOrderByUserId: jest.fn().mockResolvedValue([orderMock]),
          },
        },
      ],
      controllers: [OrderController],
    }).compile();

    orderController = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderController);
  });

  it('should be defined', () => {
    expect(orderController).toBeDefined();
    expect(orderService).toBeDefined();
  });

  describe('createOrder method', () => {
    it('should return order in create', async () => {
      const result = await orderController.createOrder(
        createOrderPixMock,
        userEntityMock.id,
      );
      expect(result).toEqual(orderMock);
    });
  });
  describe('findOrderByUserId method', () => {
    it('should return order', async () => {
      const result = await orderController.findOrderByUserId(userEntityMock.id);
      expect(result).toEqual([orderMock]);
    });
  });
});
