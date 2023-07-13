import { categoryMock } from '../../category/__mocks__/category.mock';
import { ProductEntity } from '../entity/product.entity';

export const productMock: ProductEntity = {
  categoryId: categoryMock.id,
  createdAt: new Date(),
  price: 32.2,
  id: 2,
  image: 'http/image.com',
  name: 'name product mock',
  updatedAt: new Date(),
};
