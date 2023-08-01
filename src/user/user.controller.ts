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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorator/roles.decorator';
import { UserId } from '../decorator/user-id.decorator';
import { CreateUserDTO } from './DTO/create-user.dto';
import { ReturnUserDTO } from './DTO/return-user.dto';
import { UpdatePassWordDTO } from './DTO/update-password.dto';
import { UserEntity } from './entity/user.entity';
import { UserType } from './enum/user-type.enum';
import { UserService } from './user.service';

@ApiTags('user')
@UsePipes(ValidationPipe)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create an admin user (for Root users)' })
  @Roles(UserType.Root)
  @Post('/admin')
  async createAdmin(@Body() createUser: CreateUserDTO): Promise<UserEntity> {
    return this.userService.createUser(createUser, UserType.Admin);
  }

  @ApiOperation({ summary: 'Create a regular user' })
  @Post()
  async createUser(@Body() createUser: CreateUserDTO): Promise<UserEntity> {
    return this.userService.createUser(createUser);
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users (for Root and Admin)' })
  @Roles(UserType.Root, UserType.Admin)
  @Get('/all')
  async getAllUser(): Promise<ReturnUserDTO[]> {
    return (await this.userService.getAllUser()).map(
      (userEntity) => new ReturnUserDTO(userEntity),
    );
  }
  @ApiBearerAuth()
  @Roles(UserType.Admin, UserType.Root)
  @ApiOperation({
    summary: 'Get user by ID using relations (for Root and Admin)',
  })
  @Get(':id')
  async getUserByIdUsingRelations(
    @Param('id') id: number,
  ): Promise<ReturnUserDTO> {
    return new ReturnUserDTO(
      await this.userService.getUserByIdUsingRelations(id),
    );
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Get information about the authenticated user (for Root, Admin, and User users)',
  })
  @Roles(UserType.Root, UserType.Admin, UserType.User)
  @Get()
  async GetInfoUser(@UserId() userId): Promise<ReturnUserDTO> {
    return new ReturnUserDTO(
      await this.userService.getUserByIdUsingRelations(userId),
    );
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update user password (for Root, Admin, and User users)',
  })
  @Roles(UserType.Root, UserType.Admin, UserType.User)
  @Patch()
  async updatePasswordUser(
    @Body() updatePasswordDTO: UpdatePassWordDTO,
    @UserId() userId: number,
  ): Promise<UserEntity> {
    return this.userService.updatePassWord(updatePasswordDTO, userId);
  }
}
