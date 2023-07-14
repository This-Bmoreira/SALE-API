import { UpdatePassWordDTO } from '../DTO/update-password.dto';

export const updatePassWordMock: UpdatePassWordDTO = {
  lastPassWord: '111111',
  newPassWord: 'aaa',
};

export const updatePassWordInvalidMock: UpdatePassWordDTO = {
  lastPassWord: 'abc',
  newPassWord: '1111',
};
