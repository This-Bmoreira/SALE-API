import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePassWordDTO {
  @ApiProperty({
    description: 'A nova senha do usuário',
    example: 'NovaSenhaSegura456',
  })
  @IsString()
  newPassWord: string;

  @ApiProperty({
    description: 'A senha atual do usuário',
    example: 'MinhaSenhaSegura123',
  })
  @IsString()
  lastPassWord: string;
}
