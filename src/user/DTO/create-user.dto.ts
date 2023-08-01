import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    description: 'O nome do usuário',
    example: 'Joe doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'O e-mail do usuário',
    example: 'joedoe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'O CPF do usuário',
    example: '123.456.789-00',
  })
  @IsString()
  cpf: string;

  @ApiProperty({
    description: 'O telefone do usuário',
    example: '98765-4321',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'A senha do usuário',
    example: 'MinhaSenhaSegura123',
  })
  @IsString()
  password: string;
}
