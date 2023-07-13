import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateProductDTO {
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  categoryId: number;

  @IsString()
  name: string;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  price: number;

  @IsString()
  image: string;
}
