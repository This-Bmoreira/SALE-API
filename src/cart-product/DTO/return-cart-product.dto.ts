import { ReturnCartDTO } from '../../cart/DTO/return-cart.dto';
import { ReturnProduct } from '../../product/DTO/return-product.dto';
import { CartProductEntity } from '../entity/cart-product.entity';

export class ReturnCartProductDTO {
  id: number;
  cartId: number;
  productId: number;
  amount: number;
  product?: ReturnProduct;
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
