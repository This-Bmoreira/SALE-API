import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Roles } from '../decorator/roles.decorator';
import { UserId } from '../decorator/user-id.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { CreateAddressDto } from './DTO/create-address.dto';
import { ReturnAddressDTO } from './DTO/return-address.dto';
import { AddressService } from './address.service';
import { AddressEntity } from './entity/address.entity';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
  @Roles(UserType.User)
  @Post(':userId')
  async createAddress(
    @Param('userId') userId: number,
    @Body() createAddressDTO: CreateAddressDto,
  ): Promise<AddressEntity> {
    return this.addressService.createAddress(createAddressDTO, userId);
  }
  @Roles(UserType.Admin, UserType.User)
  @Get()
  async getAddressById(@UserId() userId: number): Promise<ReturnAddressDTO[]> {
    return (await this.addressService.getAddressById(userId)).map(
      (adrress) => new ReturnAddressDTO(adrress),
    );
  }
}
