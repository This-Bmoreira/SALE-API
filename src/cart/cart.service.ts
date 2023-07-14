import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartProductService } from '../cart-product/cart-product.service';
import { InsertCartDTO } from './DTO/insert-cart.dto';
import { CartEntity } from './entity/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    private readonly cartProductService: CartProductService,
  ) {}

  async verifyActiveCart(userId: number): Promise<CartEntity> {
    const cart = await this.cartRepository.findOne({
      where: {
        userId,
      },
    });
    if (!cart) {
      throw new NotFoundException(`Cart active not found`);
    }
    return cart;
  }
  async createCart(userId: number): Promise<CartEntity> {
    return this.cartRepository.save({
      active: true,
      userId,
    });
  }

  async insertProductInCart(
    insertCartDTO: InsertCartDTO,
    userId: number,
  ): Promise<CartEntity> {
    const cart = await this.verifyActiveCart(userId).catch(async () => {
      return this.createCart(userId);
    });

    await this.cartProductService.insertProductInCart(insertCartDTO, cart);

    return cart;
  }
}
