import { orderMock } from '../../order/__mock__/order.mock';
import { productMock } from '../../product/__mocks__/product.mock';
import { OrderProductEntity } from '../entity/order-product.entity';

export const orderProductMock: OrderProductEntity = {
  amount: 2,
  price: 20,
  id: 3,
  orderId: orderMock.id,
  productId: productMock.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};
