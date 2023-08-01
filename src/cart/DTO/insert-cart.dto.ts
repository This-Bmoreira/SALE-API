import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class InsertCartDTO {
  @ApiProperty({
    description: 'ID do produto a ser adicionado ao carrinho',
    example: 1,
  })
  @IsNumber()
  productId: number;

  @ApiProperty({
    description: 'Quantidade do produto a ser adicionada ao carrinho',
    example: 2,
  })
  @IsNumber()
  amount: number;
}
