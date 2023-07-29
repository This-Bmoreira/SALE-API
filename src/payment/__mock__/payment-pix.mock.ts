import { PaymentPixEntity } from '../entity/payment-pix.entity';
import { paymentMock } from './payment.mock';

export const paymentPixMock: PaymentPixEntity = {
  ...paymentMock,
  code: 'abc',
  datePayment: new Date('2020-01-01'),
};
