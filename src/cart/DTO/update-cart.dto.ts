import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateCartDTO {
  @ApiProperty({
    description: 'ID do produto a ser atualizado no carrinho',
    example: 1,
  })
  @IsNumber()
  productId: number;

  @ApiProperty({
    description: 'Nova quantidade do produto no carrinho',
    example: 2,
  })
  @IsNumber()
  amount: number;
}
