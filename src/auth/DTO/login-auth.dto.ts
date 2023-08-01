import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginAuthDTO {
  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'johndoe@example.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'SenhaSegura123',
  })
  @IsString()
  password: string;
}
