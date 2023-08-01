import { ApiProperty } from '@nestjs/swagger';
import { ReturnAddressDTO } from '../../address/DTO/return-address.dto';
import { UserEntity } from '../entity/user.entity';

export class ReturnUserDTO {
  @ApiProperty({
    description: 'ID do usuário',
    example: 1,
  })
  id?: number;

  @ApiProperty({
    description: 'O nome do usuário',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'O e-mail do usuário',
    example: 'johndoe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'O CPF do usuário',
    example: '123.456.789-00',
  })
  cpf: string;

  @ApiProperty({
    description: 'O telefone do usuário',
    example: '+55 (11) 98765-4321',
  })
  phone?: string;

  @ApiProperty({
    description: 'Endereços associados ao usuário',
    type: [ReturnAddressDTO],
  })
  address?: ReturnAddressDTO[];

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.cpf = userEntity.cpf;
    this.phone = userEntity.phone;
    this.address = userEntity.addresses
      ? userEntity.addresses.map((address) => new ReturnAddressDTO(address))
      : undefined;
  }
}
