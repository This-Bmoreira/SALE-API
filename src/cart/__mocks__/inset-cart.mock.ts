import { productMock } from '../../product/__mocks__/product.mock';
import { InsertCartDTO } from '../DTO/insert-cart.dto';
const { id } = productMock;
export const insertCartMock: InsertCartDTO = {
  amount: 535,
  productId: id,
};
