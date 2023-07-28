import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CountProduct } from '../product/DTO/count-product.dto';
import { ProductService } from '../product/product.service';
import { CreateCategory } from './DTO/create-category.dto';
import { ReturnCategory } from './DTO/return-category.dto';
import { CategoryEntity } from './entity/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
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

  findAmountCategoryInProducts(
    category: CategoryEntity,
    countList: CountProduct[],
  ): number {
    const count = countList.find(
      (itemCount) => itemCount.category_id === category.id,
    );

    if (count) {
      return count.total;
    }

    return 0;
  }

  async getAllCategories(): Promise<ReturnCategory[]> {
    const categories = await this.categoryRepository.find();
    const count = await this.productService.countProductByCategoryId();

    if (!categories || categories.length === 0) {
      throw new NotFoundException('Category not found');
    }
    return categories.map(
      (category) =>
        new ReturnCategory(
          category,
          this.findAmountCategoryInProducts(category, count),
        ),
    );
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
  async findCategoryById(
    id: number,
    isRelations?: boolean,
  ): Promise<CategoryEntity> {
    const relations = isRelations
      ? {
          products: true,
        }
      : undefined;
    const category = await this.categoryRepository.findOne({
      where: {
        id,
      },
      relations,
    });

    if (!category) {
      throw new NotFoundException(`category ${id} not found`);
    }

    return category;
  }
  async deleteCategory(categoryId: number): Promise<DeleteResult> {
    const category = await this.findCategoryById(categoryId, true);
    if (category.products.length > 0) {
      throw new BadRequestException('Category with relations');
    }
    return this.categoryRepository.delete({ id: categoryId });
  }
}
