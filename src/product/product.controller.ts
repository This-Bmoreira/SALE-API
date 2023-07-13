import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { Roles } from '../decorator/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { CreateProductDTO } from './DTO/create-product.dto';
import { ReturnProduct } from './DTO/return-product.dto';
import { ProductEntity } from './entity/product.entity';
import { ProductService } from './product.service';

@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  async getAllProduct(): Promise<ReturnProduct[]> {
    return (await this.productService.getAllProduct()).map(
      (product) => new ReturnProduct(product),
    );
  }
  @UsePipes(ValidationPipe)
  @Roles(UserType.Admin)
  @Post()
  async createProduct(
    @Body() createProduct: CreateProductDTO,
  ): Promise<ProductEntity> {
    return this.productService.createProduct(createProduct);
  }
  @UsePipes(ValidationPipe)
  @Roles(UserType.Admin)
  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<DeleteResult> {
    return this.productService.deleteProduct(id);
  }
}
