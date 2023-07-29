import { addressMock } from '../../address/__mock__/address.mock';
import { paymentCreditCartMock } from '../../payment/__mock__/payment-credit-card.mock';
import { paymentPixMock } from '../../payment/__mock__/payment-pix.mock';
import { CreateOrderDTO } from '../DTO/create-order.dto';

export const createOrderCreditCartMock: CreateOrderDTO = {
  addressId: addressMock.id,
  amountPayments: paymentCreditCartMock.amountPayments,
};

export const createOrderPixMock: CreateOrderDTO = {
  datePayment: '2020-01-01',
  codePix: paymentPixMock.code,
  addressId: addressMock.id,
};
