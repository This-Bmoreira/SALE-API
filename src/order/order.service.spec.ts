import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { describe } from 'node:test';
import { Repository } from 'typeorm';
import { cartProductEntityMock } from '../cart-product/__mock__/product-cart.mock';
import { cartMock } from '../cart/__mocks__/cart.mock';
import { CartService } from '../cart/cart.service';
import { orderProductMock } from '../order-product/__mocks__/order-product.mock';
import { OrderProductService } from '../order-product/order-product.service';
import { paymentMock } from '../payment/__mock__/payment.mock';
import { PaymentService } from '../payment/payment.service';
import { productMock } from '../product/__mocks__/product.mock';
import { ProductService } from '../product/product.service';
import { userEntityMock } from '../user/__mocks__/user-entity.mock';
import { createOrderPixMock } from './__mock__/create-order.mock';
import { orderMock } from './__mock__/order.mock';
import { OrderEntity } from './entity/order.entity';
import { OrderService } from './order.service';

jest.useFakeTimers().setSystemTime(new Date('2023-07-22'));
describe('OrderService', () => {
  let service: OrderService;
  let orderRepository: Repository<OrderEntity>;
  let paymentService: PaymentService;
  let cartService: CartService;
  let orderProductService: OrderProductService;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(OrderEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([orderMock]),
            save: jest.fn().mockResolvedValue(orderMock),
          },
        },
        {
          provide: PaymentService,
          useValue: {
            createPayment: jest.fn().mockResolvedValue(paymentMock),
          },
        },
        {
          provide: CartService,
          useValue: {
            findCartByUserId: jest.fn().mockResolvedValue({
              ...cartMock,
              cartProduct: [cartProductEntityMock],
            }),
            clearCart: jest.fn(),
          },
        },
        {
          provide: OrderProductService,
          useValue: {
            createOrderProduct: jest.fn().mockResolvedValue(orderProductMock),
          },
        },
        {
          provide: ProductService,
          useValue: {
            getAllProduct: jest.fn().mockResolvedValue([productMock]),
          },
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    paymentService = module.get<PaymentService>(PaymentService);
    cartService = module.get<CartService>(CartService);
    orderProductService = module.get<OrderProductService>(OrderProductService);
    productService = module.get<ProductService>(ProductService);
    orderRepository = module.get<Repository<OrderEntity>>(
      getRepositoryToken(OrderEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(paymentService).toBeDefined();
    expect(cartService).toBeDefined();
    expect(orderProductService).toBeDefined();
    expect(productService).toBeDefined();
    expect(orderRepository).toBeDefined();
  });

  describe('findOrderByUserId method', () => {
    it('should return orders in findOrderByUserId', async () => {
      const spy = jest.spyOn(orderRepository, 'find');
      const result = await service.findOrderByUserId(userEntityMock.id);
      expect(result).toEqual([orderMock]);
      expect(spy.mock.calls[0][0]).toEqual({
        where: {
          userId: userEntityMock.id,
          id: undefined,
        },
        relations: {
          address: {
            city: {
              state: true,
            },
          },
          ordersProduct: {
            product: true,
          },
          payment: {
            paymentStatus: true,
          },
          user: false,
        },
      });
    });
    it('should return NotFoundException in find return empty', async () => {
      jest.spyOn(orderRepository, 'find').mockResolvedValue([]);

      expect(service.findOrderByUserId(userEntityMock.id)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
  describe('createOrderProductUsingCart method', () => {
    it('should call cartProduct amount cartProduct in cart', async () => {
      const spy = jest.spyOn(orderProductService, 'createOrderProduct');

      const result = await service.createOrderProductUsingCart(
        {
          ...cartMock,
          cartProduct: [cartProductEntityMock, cartProductEntityMock],
        },
        orderMock.id,
        [productMock],
      );
      expect(result).toEqual([orderProductMock, orderProductMock]);
      expect(spy.mock.calls.length).toEqual(2);
    });
  });
  describe('saveOrder method', () => {
    it('should return order in saveOrder', async () => {
      const spy = jest.spyOn(orderRepository, 'save');
      const order = await service.saveOrder(
        createOrderPixMock,
        userEntityMock.id,
        paymentMock,
      );
      expect(order).toEqual(orderMock);
      expect(spy.mock.calls[0][0]).toEqual({
        addressId: createOrderPixMock.addressId,
        date: new Date(),
        paymentId: paymentMock.id,
        userId: userEntityMock.id,
      });
    });
    it('should return order in error', async () => {
      jest.spyOn(orderRepository, 'save').mockRejectedValue(new Error());
      const result = service.saveOrder(
        createOrderPixMock,
        userEntityMock.id,
        paymentMock,
      );
      expect(result).rejects.toThrow();
    });
  });

  describe('createOrder method', () => {
    it('should return order in create order success', async () => {
      const order = await service.createOrder(
        createOrderPixMock,
        userEntityMock.id,
      );
      expect(order).toEqual(orderMock);
    });
    it('should return order in create order success', async () => {
      const spyFindCartByUserId = jest.spyOn(cartService, 'findCartByUserId');
      const spyGetAllProduct = jest.spyOn(productService, 'getAllProduct');
      const spyClearCart = jest.spyOn(cartService, 'clearCart');
      const spyCreatePayment = jest.spyOn(paymentService, 'createPayment');
      const spySaveOrder = jest.spyOn(orderRepository, 'save');
      const spyCreateOrderProductUsingCart = jest.spyOn(
        service,
        'createOrderProductUsingCart',
      );

      const order = await service.createOrder(
        createOrderPixMock,
        userEntityMock.id,
      );
      expect(order).toEqual(orderMock);
      expect(spyFindCartByUserId.mock.calls.length).toEqual(1);
      expect(spyGetAllProduct.mock.calls.length).toEqual(1);
      expect(spyCreatePayment.mock.calls.length).toEqual(1);
      expect(spySaveOrder.mock.calls.length).toEqual(1);
      expect(spyCreateOrderProductUsingCart.mock.calls.length).toEqual(1);
      expect(spyClearCart.mock.calls.length).toEqual(1);
    });
  });
  describe('findAllOrder method', () => {
    it('should return the correct order with user information ', async () => {
      const spy = jest.spyOn(orderRepository, 'find');
      const result = await service.findAllOrder();
      expect(result).toEqual([orderMock]);
      expect(spy.mock.calls[0][0]).toEqual({
        relations: {
          user: true,
        },
      });
    });
    it('should error in not found ', async () => {
      jest.spyOn(orderRepository, 'find').mockResolvedValue([]);
      const result = service.findAllOrder();
      expect(result).rejects.toThrowError(NotFoundException);
    });
  });
});
