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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { Roles } from '../decorator/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { CreateCategory } from './DTO/create-category.dto';
import { ReturnCategory } from './DTO/return-category.dto';
import { UpdateCategory } from './DTO/update-category.dto';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entity/category.entity';

@ApiTags('category')
@ApiBearerAuth()
@UsePipes(ValidationPipe)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Create a new category (for Root and Admin)' })
  @Roles(UserType.Root, UserType.Admin)
  @Post()
  async createCategory(
    @Body() createCategory: CreateCategory,
  ): Promise<CategoryEntity> {
    return this.categoryService.createCategory(createCategory);
  }

  @ApiOperation({ summary: 'Get all categories (for Root and Admin users)' })
  @Roles(UserType.Root, UserType.Admin, UserType.User)
  @Get()
  async findAllCategories(): Promise<ReturnCategory[]> {
    return this.categoryService.getAllCategories();
  }

  @ApiOperation({ summary: 'Delete a category (for Root and Admin)' })
  @Roles(UserType.Root, UserType.Admin)
  @Delete(':categoryId')
  async deleteCategory(
    @Param('categoryId') categoryId: number,
  ): Promise<DeleteResult> {
    return this.categoryService.deleteCategory(categoryId);
  }

  @ApiOperation({ summary: 'Edit a category (for Root and Admin)' })
  @Roles(UserType.Root, UserType.Admin)
  @Put(':categoryId')
  async editCategory(
    @Param('categoryId') categoryId: number,
    @Body() updateCategory: UpdateCategory,
  ): Promise<UpdateCategory> {
    return this.categoryService.editCategory(categoryId, updateCategory);
  }

  @ApiOperation({ summary: 'Find category by ID (for Root and Admin)' })
  @Roles(UserType.Root, UserType.Admin, UserType.User)
  @Get(':categoryId')
  async findCategoryById(
    @Param('categoryId') categoryId: number,
  ): Promise<ReturnCategory> {
    return new ReturnCategory(
      await this.categoryService.findCategoryById(categoryId, true),
    );
  }
}
