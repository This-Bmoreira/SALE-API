import { addressMock } from '../../address/__mock__/address.mock';
import { paymentMock } from '../../payment/__mock__/payment.mock';
import { userEntityMock } from '../../user/__mocks__/user-entity.mock';
import { OrderEntity } from '../entity/order.entity';

export const orderMock: OrderEntity = {
  id: 2,
  addressId: addressMock.id,
  paymentId: paymentMock.id,
  userId: userEntityMock.id,
  date: new Date(),
  updatedAt: new Date(),
  createdAt: new Date(),
};
