import { CategoryEntity } from '../entity/category.entity';

export class ReturnCategory {
  id: number;
  name: string;

  constructor({ id, name }: CategoryEntity) {
    this.id = id;
    this.name = name;
  }
}
