import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../decorator/roles.decorator';
import { UserId } from '../decorator/user-id.decorator';
import { CreateUserDTO } from './DTO/create-user.dto';
import { ReturnUserDTO } from './DTO/return-user.dto';
import { UpdatePassWordDTO } from './DTO/update-password.dto';
import { UserEntity } from './entity/user.entity';
import { UserType } from './enum/user-type.enum';
import { UserService } from './user.service';
@UsePipes(ValidationPipe)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUser: CreateUserDTO): Promise<UserEntity> {
    return this.userService.createUser(createUser);
  }
  @Roles(UserType.Admin)
  @Get()
  async getAllUser(): Promise<ReturnUserDTO[]> {
    return (await this.userService.getAllUser()).map(
      (userEntity) => new ReturnUserDTO(userEntity),
    );
  }
  @Get(':id')
  async getUserByIdUsingRelations(
    @Param('id') id: number,
  ): Promise<ReturnUserDTO> {
    return new ReturnUserDTO(
      await this.userService.getUserByIdUsingRelations(id),
    );
  }
  @Roles(UserType.Admin, UserType.User)
  @Patch()
  @UsePipes(ValidationPipe)
  async updatePasswordUser(
    @Body() updatePasswordDTO: UpdatePassWordDTO,
    @UserId() userId: number,
  ): Promise<UserEntity> {
    return this.userService.updatePassWord(updatePasswordDTO, userId);
  }
}
