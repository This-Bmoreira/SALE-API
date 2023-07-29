import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { cartProductEntityMock } from '../cart-product/__mock__/product-cart.mock';
import { cartMock } from '../cart/__mocks__/cart.mock';
import {
  createOrderCreditCartMock,
  createOrderPixMock,
} from '../order/__mock__/create-order.mock';
import { PaymentType } from '../payment-status/enum/payment-type.enum';
import { productMock } from '../product/__mocks__/product.mock';
import { paymentCreditCartMock } from './__mock__/payment-credit-card.mock';
import { paymentPixMock } from './__mock__/payment-pix.mock';
import { paymentMock } from './__mock__/payment.mock';
import { PaymentCreditCardEntity } from './entity/payment-credit-card.entity';
import { PaymentPixEntity } from './entity/payment-pix.entity';
import { PaymentEntity } from './entity/payment.entity';
import { PaymentService } from './payment.service';

describe('PaymentService', () => {
  let paymentService: PaymentService;
  let paymentRepository: Repository<PaymentEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: getRepositoryToken(PaymentEntity),
          useValue: {
            save: jest.fn().mockReturnValue(paymentMock),
          },
        },
      ],
    }).compile();

    paymentService = module.get<PaymentService>(PaymentService);
    paymentRepository = module.get<Repository<PaymentEntity>>(
      getRepositoryToken(PaymentEntity),
    );
  });

  it('should be defined', () => {
    expect(paymentService).toBeDefined();
    expect(paymentRepository).toBeDefined();
  });

  describe('createPayment method', () => {
    it('should save payment id db', async () => {
      const spy = jest.spyOn(paymentRepository, 'save');
      const payment = await paymentService.createPayment(
        createOrderPixMock,
        [productMock],
        cartMock,
      );
      const savePayment: PaymentPixEntity = spy.mock
        .calls[0][0] as PaymentPixEntity;
      expect(payment).toEqual(paymentMock);
      expect(savePayment.code).toEqual(paymentPixMock.code);
      expect(savePayment.datePayment).toEqual(paymentPixMock.datePayment);
    });
    it('should save payment credit card db', async () => {
      const spy = jest.spyOn(paymentRepository, 'save');
      const payment = await paymentService.createPayment(
        createOrderCreditCartMock,
        [productMock],
        cartMock,
      );
      const savePayment: PaymentCreditCardEntity = spy.mock
        .calls[0][0] as PaymentCreditCardEntity;
      expect(payment).toEqual(paymentMock);
      expect(savePayment.amountPayments).toEqual(
        paymentCreditCartMock.amountPayments,
      );
    });
    it('should return exception in not send data', async () => {
      expect(
        paymentService.createPayment(
          {
            addressId: createOrderCreditCartMock.addressId,
          },
          [productMock],
          cartMock,
        ),
      ).rejects.toThrowError(BadRequestException);
    });
    it('should return final price 0 in  cartProduct undefined', async () => {
      const spy = jest.spyOn(paymentRepository, 'save');
      await paymentService.createPayment(
        createOrderCreditCartMock,
        [productMock],
        cartMock,
      );
      const savePayment: PaymentCreditCardEntity = spy.mock
        .calls[0][0] as PaymentCreditCardEntity;

      expect(savePayment.finalPrice).toEqual(0);
    });
    it('should return final price sand cartProduct', async () => {
      const spy = jest.spyOn(paymentRepository, 'save');
      await paymentService.createPayment(
        createOrderCreditCartMock,
        [productMock],
        {
          ...cartMock,
          cartProduct: [cartProductEntityMock],
        },
      );
      const savePayment: PaymentCreditCardEntity = spy.mock
        .calls[0][0] as PaymentCreditCardEntity;

      expect(savePayment.finalPrice).toEqual(64.4);
    });
    it('should return all data in save payment', async () => {
      const spy = jest.spyOn(paymentRepository, 'save');
      await paymentService.createPayment(
        createOrderCreditCartMock,
        [productMock],
        {
          ...cartMock,
          cartProduct: [cartProductEntityMock],
        },
      );
      const savePayment: PaymentCreditCardEntity = spy.mock
        .calls[0][0] as PaymentCreditCardEntity;

      const paymentCreditCard: PaymentCreditCardEntity =
        new PaymentCreditCardEntity(
          PaymentType.Done,
          64.4,
          0,
          64.4,
          createOrderCreditCartMock,
        );

      expect(savePayment).toEqual(paymentCreditCard);
    });
  });
});
