import { CreateAddressDto } from '../DTO/create-address.dto';
import { addressMock } from './address.mock';
const { cep, cityId, complement, numberAddress } = addressMock;
export const createAddressDTOMock: CreateAddressDto = {
  cep: cep,
  cityId: cityId,
  complement: complement,
  numberAddress: numberAddress,
};
