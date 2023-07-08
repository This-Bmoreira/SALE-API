import { ReturnCityDTO } from '../../city/DTO/return-city-dto';
import { AddressEntity } from '../entity/address.entity';

export class ReturnAddressDTO {
  complement: string;
  numberAddress: number;
  cep: string;
  city: ReturnCityDTO;
  constructor(address: AddressEntity) {
    const { complement, cep, numberAddress, city } = address;
    this.complement = complement;
    this.numberAddress = numberAddress;
    this.cep = cep;
    this.city = city ? new ReturnCityDTO(city) : undefined;
  }
}
