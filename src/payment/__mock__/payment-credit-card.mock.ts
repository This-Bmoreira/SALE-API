import { PaymentCreditCardEntity } from '../entity/payment-credit-card.entity';
import { paymentMock } from './payment.mock';

export const paymentCreditCartMock: PaymentCreditCardEntity = {
  ...paymentMock,
  amountPayments: 32,
};
