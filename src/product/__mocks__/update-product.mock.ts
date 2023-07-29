import { categoryMock } from '../../category/__mocks__/category.mock';
import { UpdateProductDTO } from '../DTO/update-product.dto';

export const updateProductMock: UpdateProductDTO = {
  categoryId: categoryMock.id,
  price: 32.2,
  image: 'http/image.com',
  name: 'name product mock',
};
