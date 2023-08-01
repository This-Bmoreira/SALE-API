import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateProductDTO {
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

  @ApiProperty({
    description: 'Peso do produto (opcional)',
    example: 0.5,
  })
  @IsNumber()
  weight?: number;

  @ApiProperty({
    description: 'Comprimento do produto (opcional)',
    example: 20,
  })
  @IsNumber()
  length?: number;

  @ApiProperty({
    description: 'Altura do produto (opcional)',
    example: 30,
  })
  @IsNumber()
  height?: number;

  @ApiProperty({
    description: 'Largura do produto (opcional)',
    example: 10,
  })
  @IsNumber()
  width?: number;

  @ApiProperty({
    description: 'Diâmetro do produto (opcional)',
    example: 5,
  })
  @IsNumber()
  diameter?: number;
}
