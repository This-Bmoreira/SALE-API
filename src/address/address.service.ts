import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityService } from '../city/city.service';
import { UserService } from '../user/user.service';
import { CreateAddressDto } from './DTO/create-address.dto';
import { AddressEntity } from './entity/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}
  async createAddress(
    createAddressDTO: CreateAddressDto,
    userId: number,
  ): Promise<AddressEntity> {
    await this.userService.getUserById(userId);
    await this.cityService.getCityById(createAddressDTO.cityId);
    return this.addressRepository.save({
      ...createAddressDTO,
      userId,
    });
  }
}
