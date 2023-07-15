import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartProductService } from './cart-product.service';
import { CartProductEntity } from './entity/cart-product.entity';
import { productModule } from '../product/product.module';

@Module({})
@Module({
  imports: [TypeOrmModule.forFeature([CartProductEntity]), productModule],
  providers: [CartProductService],
  exports: [CartProductService],
})
export class CartProductModule {}
