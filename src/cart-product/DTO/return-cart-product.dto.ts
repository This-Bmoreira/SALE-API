import { ApiProperty } from '@nestjs/swagger';
import { ReturnCartDTO } from '../../cart/DTO/return-cart.dto';
import { ReturnProduct } from '../../product/DTO/return-product.dto';
import { CartProductEntity } from '../entity/cart-product.entity';

export class ReturnCartProductDTO {
  @ApiProperty({
    description: 'ID do item do carrinho',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'ID do carrinho',
    example: 1,
  })
  cartId: number;

  @ApiProperty({
    description: 'ID do produto',
    example: 2,
  })
  productId: number;

  @ApiProperty({
    description: 'Quantidade do produto no carrinho',
    example: 3,
  })
  amount: number;

  @ApiProperty({
    description:
      'Informações sobre o produto associado ao item do carrinho (opcional)',
    type: ReturnProduct,
    required: false,
  })
  product?: ReturnProduct;

  @ApiProperty({
    description:
      'Informações sobre o carrinho associado ao item do carrinho (opcional)',
    type: ReturnCartDTO,
    required: false,
  })
  cart?: ReturnCartDTO;

  constructor(cartProduct: CartProductEntity) {
    const { id, productId, amount, product, cartId, cart } = cartProduct;
    this.id = id;
    this.cartId = cartId;
    this.productId = productId;
    this.amount = amount;
    this.product = product ? new ReturnProduct(product) : undefined;
    this.cart = cart ? new ReturnCartDTO(cart) : undefined;
  }
}
