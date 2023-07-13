import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { CreateProductDTO } from './DTO/create-product.dto';
import { ProductEntity } from './entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly categoryService: CategoryService,
  ) {}

  async getAllProduct(): Promise<ProductEntity[]> {
    const product = await this.productRepository.find();
    if (!product || product.length === 0) {
      throw new NotFoundException('Not Found products');
    }
    return product;
  }

  async createProduct(createProduct: CreateProductDTO): Promise<ProductEntity> {
    const { categoryId } = createProduct;

    await this.categoryService.findCategoryById(categoryId);
    return this.productRepository.save({
      ...createProduct,
    });
  }
}
