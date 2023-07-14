import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartProductModule } from '../cart-product/cart-product.module';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartEntity } from './entity/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity]), CartProductModule],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
