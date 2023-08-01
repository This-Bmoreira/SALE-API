import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateCategory {
  @ApiProperty({
    description: 'Categoria de produtos',
    example: 'Jogos',
  })
  @IsString()
  name: string;
}
