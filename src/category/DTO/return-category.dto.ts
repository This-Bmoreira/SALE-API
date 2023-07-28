import { ReturnProduct } from '../../product/DTO/return-product.dto';
import { CategoryEntity } from '../entity/category.entity';

export class ReturnCategory {
  id: number;
  name: string;
  amountProduct?: number;
  product?: ReturnProduct[];
  constructor({ id, name, products }: CategoryEntity, amountProduct?: number) {
    this.id = id;
    this.name = name;
    this.amountProduct = amountProduct;
    this.product = products
      ? products.map((product) => new ReturnProduct(product))
      : undefined;
  }
}
