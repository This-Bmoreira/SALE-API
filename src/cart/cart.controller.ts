import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { Roles } from '../decorator/roles.decorator';
import { UserId } from '../decorator/user-id.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { InsertCartDTO } from './DTO/insert-cart.dto';
import { ReturnCartDTO } from './DTO/return-cart.dto';
import { UpdateCartDTO } from './DTO/update-cart.dto';
import { CartService } from './cart.service';

@ApiBearerAuth()
@ApiTags('cart')
@Controller('cart')
@Roles(UserType.User, UserType.Admin, UserType.Root)
@UsePipes(ValidationPipe)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: 'Create a new cart (for Root and Admin users)' })
  @Post()
  async createCart(
    @Body() insertCart: InsertCartDTO,
    @UserId() userId: number,
  ): Promise<ReturnCartDTO> {
    return new ReturnCartDTO(
      await this.cartService.insertProductInCart(insertCart, userId),
    );
  }

  @ApiOperation({ summary: 'Find cart by user ID (for Root and Admin users)' })
  @Get()
  async findCartByUserId(@UserId() userId: number): Promise<ReturnCartDTO> {
    return new ReturnCartDTO(
      await this.cartService.findCartByUserId(userId, true),
    );
  }

  @ApiOperation({
    summary: 'Clear cart for the user (for Root and Admin users)',
  })
  @Delete()
  async clearCart(@UserId() userId: number): Promise<DeleteResult> {
    return this.cartService.clearCart(userId);
  }

  @ApiOperation({
    summary: 'Delete a product from the cart (for Root and Admin users)',
  })
  @Delete('/product/:productId')
  async deleteProductCart(
    @Param('productId') productId: number,
    @UserId() userId: number,
  ): Promise<DeleteResult> {
    return this.cartService.deleteProductCart(productId, userId);
  }

  @ApiOperation({
    summary: 'Update product in the cart (for Root and Admin users)',
  })
  @Patch()
  async updateProductInCart(
    @Body() UpdateCartDTO: UpdateCartDTO,
    @UserId() userId: number,
  ): Promise<ReturnCartDTO> {
    return new ReturnCartDTO(
      await this.cartService.updateProductInCart(UpdateCartDTO, userId),
    );
  }
}
