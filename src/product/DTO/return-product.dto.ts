import { ProductEntity } from '../entity/product.entity';

export class ReturnProduct {
  categoryId: number;
  id: number;
  name: string;
  price: number;
  image: string;
  constructor({ categoryId, name, price, image, id }: ProductEntity) {
    this.categoryId = categoryId;
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
  }
}
