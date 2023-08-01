import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateProductDTO {
  @ApiProperty({
    description: 'ID da categoria do produto',
    example: 1,
  })
  @IsNumber()
  categoryId: number;

  @ApiProperty({
    description: 'Nome do produto',
    example: 'Camiseta Branca',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Preço do produto',
    example: 29.99,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'URL da imagem do produto',
    example: 'https://example.com/product-image.jpg',
  })
  @IsString()
  image: string;
}
