import { ReturnAddressDTO } from '../../address/DTO/return-address.dto';
import { UserEntity } from '../entity/user.entity';

export class ReturnUserDTO {
  id: number;
  name: string;
  email: string;
  cpf: string;
  phone: string;
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
