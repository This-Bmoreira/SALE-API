import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './DTO/create-address.dto';
import { AddressEntity } from './entity/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {}
  async createAddress(
    createAddressDTO: CreateAddressDto,
    userId: number,
  ): Promise<AddressEntity> {
    return this.addressRepository.save({
      ...createAddressDTO,
      userId,
    });
  }
}
