import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorator/roles.decorator';
import { UserId } from '../decorator/user-id.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { CreateAddressDto } from './DTO/create-address.dto';
import { ReturnAddressDTO } from './DTO/return-address.dto';
import { AddressService } from './address.service';
import { AddressEntity } from './entity/address.entity';
@Roles(UserType.Root, UserType.Admin, UserType.User)
@UsePipes(ValidationPipe)
@ApiBearerAuth()
@ApiTags('address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiOperation({ summary: 'Create an address (for Root and Admin users)' })
  @Post()
  async createAddress(
    @UserId() userId: number,
    @Body() createAddressDTO: CreateAddressDto,
  ): Promise<AddressEntity> {
    return this.addressService.createAddress(createAddressDTO, userId);
  }

  @ApiOperation({
    summary: 'Get addresses by user ID (for Root, Admin, and User users)',
  })
  @Get()
  async getAddressById(@UserId() userId: number): Promise<ReturnAddressDTO[]> {
    return (await this.addressService.getAddressById(userId)).map(
      (address) => new ReturnAddressDTO(address),
    );
  }
}
