import { IsEmail, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  cpf: string;

  @IsString()
  phone: string;

  @IsString()
  password: string;
}
