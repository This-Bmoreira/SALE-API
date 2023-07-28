import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { Roles } from '../decorator/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { CreateCategory } from './DTO/create-category.dto';
import { ReturnCategory } from './DTO/return-category.dto';
import { UpdateCategory } from './DTO/update-category.dto';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entity/category.entity';

@Roles(UserType.Root, UserType.Admin, UserType.User)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Roles(UserType.Root, UserType.Admin)
  @UsePipes(ValidationPipe)
  @Post()
  async createCategory(
    @Body() createCategory: CreateCategory,
  ): Promise<CategoryEntity> {
    return this.categoryService.createCategory(createCategory);
  }
  @Roles(UserType.Root, UserType.Admin, UserType.User)
  @Get()
  async findAllCategories(): Promise<ReturnCategory[]> {
    return this.categoryService.getAllCategories();
  }
  @Roles(UserType.Root, UserType.Admin)
  @Delete(':categoryId')
  async deleteCategory(
    @Param('categoryId') categoryId: number,
  ): Promise<DeleteResult> {
    return this.categoryService.deleteCategory(categoryId);
  }

  @Roles(UserType.Root, UserType.Admin)
  @UsePipes(ValidationPipe)
  @Put(':categoryId')
  async editCategory(
    @Param('categoryId') categoryId: number,
    @Body() updateCategory: UpdateCategory,
  ): Promise<CategoryEntity> {
    return this.categoryService.editCategory(categoryId, updateCategory);
  }
}
