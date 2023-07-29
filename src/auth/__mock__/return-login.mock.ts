import { userEntityMock } from '../../user/__mocks__/user-entity.mock';
import { ReturnLogin } from '../DTO/return-login.dto';
import { jwtMock } from './jwt.mock';

export const returnLoginMock: ReturnLogin = {
  accessToken: jwtMock,
  user: userEntityMock,
};
