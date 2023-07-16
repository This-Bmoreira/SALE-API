import { productMock } from '../../product/__mocks__/product.mock';
import { CartProductEntity } from '../entity/cart-product.entity';

export const cartProductEntityMock: CartProductEntity = {
  id: 2,
  cartId: 1,
  amount: 123,
  productId: productMock.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};
