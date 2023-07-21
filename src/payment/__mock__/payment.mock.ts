import { PaymentType } from '../../payment-status/enum/payment-type.enum';
import { PaymentEntity } from '../entity/payment.entity';

export const paymentMock: PaymentEntity = {
  createdAt: new Date(),
  discount: 432,
  finalPrice: 732.3,
  id: 32,
  price: 35,
  statusId: PaymentType.Done,
  updatedAt: new Date(),
  type: '',
};
