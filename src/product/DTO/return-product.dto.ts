import { ReturnCategory } from '../../category/DTO/return-category.dto';
import { ProductEntity } from '../entity/product.entity';

export class ReturnProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: ReturnCategory;
  weight?: number;
  height?: number;
  width?: number;
  length?: number;
  diameter?: number;

  constructor({
    name,
    price,
    image,
    id,
    category,
    weight,
    height,
    width,
    length,
    diameter,
  }: ProductEntity) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.weight = weight;
    this.height = height;
    this.width = width;
    this.length = length;
    this.diameter = diameter;
    this.category = category ? new ReturnCategory(category) : undefined;
  }
}
