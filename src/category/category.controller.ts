import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../decorator/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { CreateCategory } from './DTO/create-category.dto';
import { ReturnCategory } from './DTO/return-category.dto';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entity/category.entity';

@Roles(UserType.Admin, UserType.User)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Roles(UserType.Admin)
  @UsePipes(ValidationPipe)
  @Post()
  async createCategory(
    @Body() createCategory: CreateCategory,
  ): Promise<CategoryEntity> {
    return this.categoryService.createCategory(createCategory);
  }
  @Roles(UserType.Admin, UserType.User)
  @Get()
  async findAllCategories(): Promise<ReturnCategory[]> {
    return this.categoryService.getAllCategories();
  }
}
