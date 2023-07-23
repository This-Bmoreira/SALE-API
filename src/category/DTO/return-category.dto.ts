import { CategoryEntity } from '../entity/category.entity';

export class ReturnCategory {
  id: number;
  name: string;
  amountProduct?: number;
  constructor({ id, name }: CategoryEntity, amountProduct?: number) {
    this.id = id;
    this.name = name;
    this.amountProduct = amountProduct;
  }
}
