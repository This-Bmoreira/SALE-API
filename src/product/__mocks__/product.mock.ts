import { categoryMock } from '../../category/__mocks__/category.mock';
import { Pagination } from '../../dto/pagination.dto';
import { ProductEntity } from '../entity/product.entity';

export const productMock: ProductEntity = {
  categoryId: categoryMock.id,
  createdAt: new Date(),
  price: 32.2,
  id: 2,
  weight: 5,
  length: 5,
  height: 5,
  width: 5,
  diameter: 5,
  image: 'http/image.com',
  name: 'name product mock',
  updatedAt: new Date(),
};

export const productPaginationMock: Pagination<ProductEntity[]> = {
  data: [productMock],
  meta: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 10,
    totalPages: 1,
  },
};
