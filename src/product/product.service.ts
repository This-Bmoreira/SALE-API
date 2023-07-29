import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, In, Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { SizeProductDTO } from '../correios/DTO/size-product.dto';
import { CorreiosService } from '../correios/correios.service';
import { CdServiceEnum } from '../correios/enum/cd-service.enum';
import { Pagination, PaginationMeta } from '../dto/pagination.dto';
import { CountProduct } from './DTO/count-product.dto';
import { CreateProductDTO } from './DTO/create-product.dto';
import { ReturnPriceDeliveryDTO } from './DTO/return-price-delivery.dto';
import { UpdateProductDTO } from './DTO/update-product.dto';
import { ProductEntity } from './entity/product.entity';

const DEFAULT_PAGE_SIZE = 10;
const FIRST_PAGE = 1;
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @Inject(forwardRef(() => CategoryService))
    private readonly categoryService: CategoryService,
    private readonly correiosService: CorreiosService,
  ) {}

  async findAllPage(
    search?: string,
    size = DEFAULT_PAGE_SIZE,
    page = FIRST_PAGE,
  ): Promise<Pagination<ProductEntity[]>> {
    const skip = (page - 1) * size;
    let findOptions = {};

    if (search) {
      findOptions = {
        where: {
          name: ILike(`%${search}%`),
        },
      };
    }

    const [product, total] = await this.productRepository.findAndCount({
      ...findOptions,
      take: size,
      skip,
    });
    if (!product || product.length === 0) {
      throw new NotFoundException('Not Found products');
    }
    const totalPages: number = Math.ceil(total / size);

    return new Pagination(
      new PaginationMeta(Number(size), total, Number(page), totalPages),
      product,
    );
  }

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
      weight: createProduct.weight || 0,
      length: createProduct.length || 0,
      height: createProduct.height || 0,
      width: createProduct.width || 0,
      diameter: createProduct.diameter || 0,
    });
  }
  async findProductById(
    id: number,
    isRelations?: boolean,
  ): Promise<ProductEntity> {
    const relations = isRelations
      ? {
          category: true,
        }
      : undefined;
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
      relations: {
        category: true,
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
  async findPriceDelivery(cep: string, idProduct: number): Promise<any> {
    const product = await this.findProductById(idProduct);

    const sizeProduct = new SizeProductDTO(product);

    const resultPrice = await Promise.all([
      this.correiosService.priceDelivery(CdServiceEnum.PAC, cep, sizeProduct),
      this.correiosService.priceDelivery(CdServiceEnum.SEDEX, cep, sizeProduct),
      this.correiosService.priceDelivery(
        CdServiceEnum.SEDEX_10,
        cep,
        sizeProduct,
      ),
    ]).catch(() => {
      throw new BadRequestException('Error find delivery price');
    });

    return new ReturnPriceDeliveryDTO(resultPrice);
  }
}
