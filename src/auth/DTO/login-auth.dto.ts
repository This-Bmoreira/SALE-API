import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginAuthDTO {
  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'root@gmail.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: '111111',
  })
  @IsString()
  password: string;
}
