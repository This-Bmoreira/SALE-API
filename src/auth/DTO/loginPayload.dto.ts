import { UserEntity } from '../../user/entity/user.entity';

export class LoginPayLoadDTO {
  id: number;
  typeUser: number;
  constructor({ id, typeUser }: UserEntity) {
    this.id = id;
    this.typeUser = typeUser;
  }
}
