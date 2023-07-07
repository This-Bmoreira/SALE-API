import {
  Injectable,
  NotFoundException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './DTO/create-user.dto';
import { UserEntity } from './entity/user.entity';
@UsePipes(ValidationPipe)
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async createUser(createUser: CreateUserDTO): Promise<UserEntity> {
    const saltOrRounds = 10;
    const { password } = createUser;
    const hash = await bcrypt.hash(password, saltOrRounds);

    return this.userRepository.save({
      ...createUser,
      typeUser: 1,
      password: hash,
    });
  }
  async getAllUser(): Promise<UserEntity[]> {
    return this.userRepository.find();
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
}
