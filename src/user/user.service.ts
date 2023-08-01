import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createPasswordHashed, validatePassword } from '../utils/password';
import { CreateUserDTO } from './DTO/create-user.dto';
import { UpdatePassWordDTO } from './DTO/update-password.dto';
import { UserEntity } from './entity/user.entity';
import { UserType } from './enum/user-type.enum';
@UsePipes(ValidationPipe)
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async createUser(
    createUser: CreateUserDTO,
    userType?: number,
  ): Promise<UserEntity> {
    const { email } = createUser;

    const user = await this.findUserByEmail(email).catch(() => undefined);
    if (user) {
      throw new BadRequestException('Email registered in system');
    }

    const { password } = createUser;
    const hash = await createPasswordHashed(password);

    return this.userRepository.save({
      ...createUser,
      typeUser: userType ? userType : UserType.User,
      password: hash,
    });
  }
  async getAllUser(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
  async getUserByIdUsingRelations(id: number): Promise<UserEntity> {
    await this.getUserById(id);

    return this.userRepository.findOne({
      where: {
        id,
      },
      relations: { addresses: { city: { state: true } } },
    });
  }
  async getUserById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User id not Found');
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new NotFoundException('Email not Found');
    }
    return user;
  }
  async updatePassWord(
    updatePassWordUser: UpdatePassWordDTO,
    id: number,
  ): Promise<UserEntity> {
    const user = await this.getUserById(id);
    const { password } = user;
    const { newPassWord, lastPassWord } = updatePassWordUser;

    const hash = await createPasswordHashed(newPassWord);

    const isMatch = await validatePassword(lastPassWord, password);

    if (!isMatch) {
      throw new BadRequestException('last password invalid');
    }

    return this.userRepository.save({
      ...user,
      password: hash,
    });
  }
}
