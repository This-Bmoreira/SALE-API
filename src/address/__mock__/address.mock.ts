import { cityMock } from '../../city/__mocks__/city.mock';
import { userEntityMock } from '../../user/__mocks__/user-entity.mock';
import { AddressEntity } from '../entity/address.entity';

export const addressMock: AddressEntity = {
  cep: '21840-533',
  cityId: cityMock.id,
  id: 19,
  userId: userEntityMock.id,
  numberAddress: 21,
  updated_at: new Date(),
  created_at: new Date(),
  complement: 'any',
};
