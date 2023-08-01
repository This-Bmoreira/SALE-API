import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../user/entity/user.entity';

export class LoginPayLoadDTO {
  @ApiProperty({
    description: 'ID do usuário autenticado',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Tipo de usuário autenticado',
    example: 2,
  })
  typeUser: number;

  constructor({ id, typeUser }: UserEntity) {
    this.id = id;
    this.typeUser = typeUser;
  }
}
