import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { UserId } from '../decorator/user-id.decorator';
import { InsertCartDTO } from './DTO/insert-cart.dto';
import { ReturnCartDTO } from './DTO/return-cart.dto';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createCart(
    @Body() insertCart: InsertCartDTO,
    @UserId() userId: number,
  ): Promise<ReturnCartDTO> {
    return new ReturnCartDTO(
      await this.cartService.insertProductInCart(insertCart, userId),
    );
  }
  @Get()
  async findCartByUserId(@UserId() userId: number): Promise<ReturnCartDTO> {
    return new ReturnCartDTO(
      await this.cartService.findCartByUserId(userId, true),
    );
  }
  @Delete()
  async clearCart(@UserId() userId: number): Promise<DeleteResult> {
    return this.cartService.clearCart(userId);
  }
}
