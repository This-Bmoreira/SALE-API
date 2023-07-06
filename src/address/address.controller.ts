import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateAddressDto } from './DTO/create-address.dto';
import { AddressService } from './address.service';
import { AddressEntity } from './entity/address.entity';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post(':userId')
  async createAddress(
    @Param('userId') userId: number,
    @Body() createAddressDTO: CreateAddressDto,
  ): Promise<AddressEntity> {
    return this.addressService.createAddress(createAddressDTO, userId);
  }
}
