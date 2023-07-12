import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategory } from './DTO/create-category.dto';
import { CategoryEntity } from './entity/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}
  async createCategory(
    createCategory: CreateCategory,
  ): Promise<CategoryEntity> {
    const { name } = CreateCategory;
    const category = await this.findCategoryByName(name).catch(() => undefined);
    if (category) {
      throw new BadRequestException('category not found');
    }
    return this.categoryRepository.save(createCategory);
  }

  async getAllCategories(): Promise<CategoryEntity[]> {
    const categories = await this.categoryRepository.find();

    if (!categories || categories.length === 0) {
      throw new NotFoundException('Category not found');
    }
    return categories;
  }
  async findCategoryByName(name: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: {
        name,
      },
    });

    if (!category) {
      throw new NotFoundException(`category ${name} not found`);
    }

    return category;
  }
}
