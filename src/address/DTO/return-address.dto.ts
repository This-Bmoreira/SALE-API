import { AddressEntity } from '../entity/address.entity';

export class ReturnAddressDTO {
  complement: string;
  numberAddress: number;
  cep: string;
  constructor(address: AddressEntity) {
    const { complement, cep, numberAddress } = address;
    this.complement = complement;
    this.numberAddress = numberAddress;
    this.cep = cep;
  }
}
