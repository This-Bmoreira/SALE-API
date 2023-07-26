import { ProductEntity } from '../../product/entity/product.entity';

export class SizeProductDTO {
  weight: number;
  length: number;
  height: number;
  width: number;
  diameter: number;
  productValue: number;

  constructor(product: ProductEntity) {
    this.weight = 15;
    this.length = 20;
    this.height = 20;
    this.width = 20;
    this.diameter = 20;
    this.productValue = product.price;
  }
}
