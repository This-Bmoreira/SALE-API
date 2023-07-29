import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CartProductService } from '../cart-product/cart-product.service';
import { InsertCartDTO } from './DTO/insert-cart.dto';
import { UpdateCartDTO } from './DTO/update-cart.dto';
import { CartEntity } from './entity/cart.entity';

const LINE_AFFECTED = 1;
@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    private readonly cartProductService: CartProductService,
  ) {}

  async findCartByUserId(
    userId: number,
    isRelations?: boolean,
  ): Promise<CartEntity> {
    const relations = isRelations
      ? {
          cartProduct: {
            product: true,
          },
        }
      : undefined;
    const cart = await this.cartRepository.findOne({
      where: {
        userId,
        active: true,
      },
      relations,
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
    const cart = await this.findCartByUserId(userId).catch(async () => {
      return this.createCart(userId);
    });

    await this.cartProductService.insertProductInCart(insertCartDTO, cart);

    return cart;
  }

  async clearCart(userId: number): Promise<DeleteResult> {
    const cart = await this.findCartByUserId(userId);
    await this.cartRepository.save({
      ...cart,
      active: false,
    });
    return {
      raw: [],
      affected: LINE_AFFECTED,
    };
  }
  async deleteProductCart(
    productId: number,
    userId: number,
  ): Promise<DeleteResult> {
    const { id } = await this.findCartByUserId(userId);
    return this.cartProductService.deleteProductCart(productId, id);
  }
  async updateProductInCart(
    updateCartDTO: UpdateCartDTO,
    userId: number,
  ): Promise<CartEntity> {
    const cart = await this.findCartByUserId(userId).catch(async () => {
      return this.createCart(userId);
    });

    await this.cartProductService.updateProductInCart(updateCartDTO, cart);
    return cart;
  }
}
