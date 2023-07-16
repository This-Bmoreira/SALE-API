import { userEntityMock } from '../../user/__mocks__/user-entity.mock';
import { CartEntity } from '../entity/cart.entity';

export const cartMock: CartEntity = {
  userId: userEntityMock.id,
  id: 1,
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};
