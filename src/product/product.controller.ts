import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { Roles } from '../decorator/roles.decorator';
import { Pagination } from '../dto/pagination.dto';
import { UserType } from '../user/enum/user-type.enum';
import { CreateProductDTO } from './DTO/create-product.dto';
import { ReturnPriceDeliveryDTO } from './DTO/return-price-delivery.dto';
import { ReturnProduct } from './DTO/return-product.dto';
import { UpdateProductDTO } from './DTO/update-product.dto';
import { ProductEntity } from './entity/product.entity';
import { ProductService } from './product.service';

@ApiBearerAuth()
@UsePipes(ValidationPipe)
@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles(UserType.Root, UserType.Admin, UserType.User)
  @ApiOperation({ summary: 'Get all products (for Root and Admin users)' })
  @Get()
  async getAllProduct(): Promise<ReturnProduct[]> {
    return (await this.productService.getAllProduct([], true)).map(
      (product) => new ReturnProduct(product),
    );
  }

  @ApiOperation({
    summary: 'Find products with pagination (for Root and Admin users)',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search query for product name',
  })
  @ApiQuery({
    name: 'size',
    required: false,
    description: 'Number of items per page',
    type: Number,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number',
    type: Number,
  })
  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get('page')
  async findAllPage(
    @Query('search') search?: string,
    @Query('size') size?: number,
    @Query('page') page?: number,
  ): Promise<Pagination<ProductEntity[]>> {
    return await this.productService.findAllPage(search, size, page);
  }

  @ApiOperation({ summary: 'Create a new product (for Root and Admin)' })
  @Roles(UserType.Root, UserType.Admin)
  @Post()
  async createProduct(
    @Body() createProduct: CreateProductDTO,
  ): Promise<ProductEntity> {
    return this.productService.createProduct(createProduct);
  }

  @ApiOperation({ summary: 'Delete a product (for Root and Admin )' })
  @Roles(UserType.Root, UserType.Admin)
  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<DeleteResult> {
    return this.productService.deleteProduct(id);
  }

  @ApiOperation({ summary: 'Update a product (for Root and Admin )' })
  @Roles(UserType.Root, UserType.Admin)
  @Put(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() updateProductDTO: UpdateProductDTO,
  ): Promise<ProductEntity> {
    return this.productService.updateProduct(updateProductDTO, id);
  }

  @ApiOperation({ summary: 'Find product by ID (for Root and Admin users)' })
  @Roles(UserType.Root, UserType.Admin, UserType.User)
  @Get(':productId')
  async findProductById(
    @Param('productId') productId: number,
  ): Promise<ReturnProduct> {
    return new ReturnProduct(
      await this.productService.findProductById(productId, true),
    );
  }

  @Roles(UserType.Root, UserType.Admin, UserType.User)
  @ApiOperation({
    summary:
      'Find price delivery for a product by CEP (for Root and Admin users)',
  })
  @Get('/:idProduct/delivery/:cep')
  async findPriceDelivery(
    @Param('idProduct') idProduct: number,
    @Param('cep') cep: string,
  ): Promise<ReturnPriceDeliveryDTO> {
    return this.productService.findPriceDelivery(cep, idProduct);
  }
}
