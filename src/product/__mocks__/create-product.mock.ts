import { categoryMock } from '../../category/__mocks__/category.mock';
import { CreateProductDTO } from '../DTO/create-product.dto';
export const createProductMock: CreateProductDTO = {
  categoryId: categoryMock.id,
  name: 'nameMock',
  price: 123,
  image: 'img mock',
};
