import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartProductEntity } from '../cart-product/entity/cart-product.entity';
import { CartEntity } from '../cart/entity/cart.entity';
import { CreateOrderDTO } from '../order/DTO/create-order.dto';
import { PaymentType } from '../payment-status/enum/payment-type.enum';
import { ProductEntity } from '../product/entity/product.entity';
import { PaymentCreditCardEntity } from './entity/payment-credit-card.entity';
import { PaymentPixEntity } from './entity/payment-pix.entity';
import { PaymentEntity } from './entity/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
  ) {}

  generateFinalPrice(cart: CartEntity, products: ProductEntity[]) {
    if (!cart.cartProduct || cart.cartProduct.length === 0) {
      return 0;
    }
    return cart.cartProduct
      .map((cartProduct: CartProductEntity) => {
        const product = products.find(
          (product) => product.id === cartProduct.productId,
        );
        if (product) {
          return cartProduct.amount * product.price;
        }
        return 0;
      })
      .reduce((acc, currentValue) => acc + currentValue, 0);
  }

  async createPayment(
    createOrderDTO: CreateOrderDTO,
    products: ProductEntity[],
    cart: CartEntity,
  ): Promise<PaymentEntity> {
    const finalPrice = this.generateFinalPrice(cart, products);

    if (createOrderDTO.amountPayments) {
      const paymentCreditCard = new PaymentCreditCardEntity(
        PaymentType.Done,
        finalPrice,
        0,
        finalPrice,
        createOrderDTO,
      );
      return this.paymentRepository.save(paymentCreditCard);
    } else if (createOrderDTO.codePix && createOrderDTO.datePayment) {
      const paymentPix = new PaymentPixEntity(
        PaymentType.Done,
        finalPrice,
        0,
        finalPrice,
        createOrderDTO,
      );
      return this.paymentRepository.save(paymentPix);
    }

    throw new BadRequestException(
      'Amount Payments or code pix or date payment not found',
    );
  }
}
