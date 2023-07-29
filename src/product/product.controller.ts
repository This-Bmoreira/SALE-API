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

@Roles(UserType.Root, UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  async getAllProduct(): Promise<ReturnProduct[]> {
    return (await this.productService.getAllProduct([], true)).map(
      (product) => new ReturnProduct(product),
    );
  }
  @Get('page')
  async findAllPage(
    @Query('search') search?: string,
    @Query('size') size?: number,
    @Query('page') page?: number,
  ): Promise<Pagination<ProductEntity[]>> {
    return await this.productService.findAllPage(search, size, page);
  }
  @UsePipes(ValidationPipe)
  @Roles(UserType.Root, UserType.Admin)
  @Post()
  async createProduct(
    @Body() createProduct: CreateProductDTO,
  ): Promise<ProductEntity> {
    return this.productService.createProduct(createProduct);
  }
  @UsePipes(ValidationPipe)
  @Roles(UserType.Root, UserType.Admin)
  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<DeleteResult> {
    return this.productService.deleteProduct(id);
  }

  @UsePipes(ValidationPipe)
  @Roles(UserType.Root, UserType.Admin)
  @Put(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() updateProductDTO: UpdateProductDTO,
  ): Promise<ProductEntity> {
    return this.productService.updateProduct(updateProductDTO, id);
  }

  @UsePipes(ValidationPipe)
  @Roles(UserType.Root, UserType.Admin, UserType.User)
  @Get(':productId')
  async findProductById(
    @Param('productId') productId: number,
  ): Promise<ReturnProduct> {
    return new ReturnProduct(
      await this.productService.findProductById(productId, true),
    );
  }

  @Get('/:idProduct/delivery/:cep')
  async findPriceDelivery(
    @Param('idProduct') idProduct: number,
    @Param('cep') cep: string,
  ): Promise<ReturnPriceDeliveryDTO> {
    return this.productService.findPriceDelivery(cep, idProduct);
  }
}
