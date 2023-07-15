import { ReturnCartProductDTO } from '../../cart-product/DTO/return-cart-product.dto';
import { CartEntity } from '../entity/cart.entity';

export class ReturnCartDTO {
  id: number;
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
