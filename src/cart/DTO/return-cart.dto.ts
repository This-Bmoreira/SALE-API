import { ApiProperty } from '@nestjs/swagger';
import { ReturnCartProductDTO } from '../../cart-product/DTO/return-cart-product.dto';
import { CartEntity } from '../entity/cart.entity';

export class ReturnCartDTO {
  @ApiProperty({
    description: 'ID do carrinho',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Produtos presentes no carrinho (opcional)',
    type: [ReturnCartProductDTO],
  })
  cartProduct?: ReturnCartProductDTO[];

  constructor(cart: CartEntity) {
    this.id = cart.id;
    this.cartProduct = cart.cartProduct
      ? cart.cartProduct.map(
          (cartProduct) => new ReturnCartProductDTO(cartProduct),
        )
      : undefined;
  }
}
