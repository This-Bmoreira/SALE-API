import { ApiProperty } from '@nestjs/swagger';
import { ReturnCategory } from '../../category/DTO/return-category.dto';
import { ProductEntity } from '../entity/product.entity';

export class ReturnProduct {
  @ApiProperty({
    description: 'ID do produto',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Nome do produto',
    example: 'Camiseta Branca',
  })
  name: string;

  @ApiProperty({
    description: 'Preço do produto',
    example: 29.99,
  })
  price: number;

  @ApiProperty({
    description: 'URL da imagem do produto',
    example: 'https://example.com/product-image.jpg',
  })
  image: string;

  @ApiProperty({
    description: 'Categoria do produto (opcional)',
    type: ReturnCategory,
    required: false,
  })
  category?: ReturnCategory;

  @ApiProperty({
    description: 'Peso do produto (opcional)',
    example: 0.5,
    required: false,
  })
  weight?: number;

  @ApiProperty({
    description: 'Altura do produto (opcional)',
    example: 20,
    required: false,
  })
  height?: number;

  @ApiProperty({
    description: 'Largura do produto (opcional)',
    example: 10,
    required: false,
  })
  width?: number;

  @ApiProperty({
    description: 'Comprimento do produto (opcional)',
    example: 30,
    required: false,
  })
  length?: number;

  @ApiProperty({
    description: 'Diâmetro do produto (opcional)',
    example: 5,
    required: false,
  })
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
