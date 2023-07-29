import { userEntityMock } from '../../user/__mocks__/user-entity.mock';
import { LoginAuthDTO } from '../DTO/login-auth.dto';

export const loginUserMock: LoginAuthDTO = {
  email: userEntityMock.email,
  password: '111111',
};
