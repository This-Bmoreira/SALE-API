import { ProductEntity } from '../entity/product.entity';

export class ReturnProduct {
  categoryId: number;
  name: string;
  price: number;
  image: string;
  constructor({ categoryId, name, price, image }: ProductEntity) {
    this.categoryId = categoryId;
    this.name = name;
    this.price = price;
    this.image = image;
  }
}
