import { ReturnCategory } from '../../category/DTO/return-category.dto';
import { ProductEntity } from '../entity/product.entity';

export class ReturnProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: ReturnCategory;
  constructor({ name, price, image, id, category }: ProductEntity) {
    this.category = category ? new ReturnCategory(category) : undefined;
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
  }
}
