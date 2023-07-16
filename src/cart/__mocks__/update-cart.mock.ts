import { productMock } from '../../product/__mocks__/product.mock';
import { UpdateCartDTO } from '../DTO/update-cart.dto';
const { id } = productMock;
export const updateCartMock: UpdateCartDTO = {
  amount: 535,
  productId: id,
};
