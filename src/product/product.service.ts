import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { CountProduct } from './DTO/count-product.dto';
import { CreateProductDTO } from './DTO/create-product.dto';
import { UpdateProductDTO } from './DTO/update-product.dto';
import { ProductEntity } from './entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @Inject(forwardRef(() => CategoryService))
    private readonly categoryService: CategoryService,
  ) {}

  async getAllProduct(
    productId?: number[],
    isFindRelations?: boolean,
  ): Promise<ProductEntity[]> {
    let findOptions = {};

    if (productId && productId.length > 0) {
      findOptions = {
        where: {
          id: In(productId),
        },
      };
    }

    if (isFindRelations) {
      findOptions = {
        ...findOptions,
        relations: {
          category: true,
        },
      };
    }
    const product = await this.productRepository.find(findOptions);
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
  async findProductById(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
    });
    if (!product) {
      throw new NotFoundException('not found product');
    }
    return product;
  }

  async deleteProduct(id: number): Promise<DeleteResult> {
    const product = await this.findProductById(id);

    return this.productRepository.delete({ id: product.id });
  }

  async updateProduct(
    updateProductDTO: UpdateProductDTO,
    id: number,
  ): Promise<ProductEntity> {
    const product = await this.findProductById(id);

    return this.productRepository.save({ ...product, ...updateProductDTO });
  }
  async countProductByCategoryId(): Promise<CountProduct[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .select('product.category_id, COUNT(*) as total')
      .groupBy('product.category_id')
      .getRawMany();
  }
}
