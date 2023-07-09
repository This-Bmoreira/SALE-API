import { UserEntity } from '../entity/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userEntityMock: UserEntity = {
  id: 2,
  name: 'Joe Doe',
  password: '$2b$10$yHaf0ptZ1MQrwLysHS.TbOhZQqCKhOmiQ/Nm7YDxTwOkMcFwOhxv2',
  email: 'jd@gmail.com',
  phone: '90000-0000',
  cpf: '341.321.333-32',
  typeUser: UserType.User,
  created_at: new Date(),
  updated_at: new Date(),
};
