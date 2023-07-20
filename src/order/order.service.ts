import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartService } from '../cart/cart.service';
import { OrderProductService } from '../order-product/order-product.service';
import { PaymentEntity } from '../payment/entity/payment.entity';
import { PaymentService } from '../payment/payment.service';
import { ProductService } from '../product/product.service';
import { CreateOrderDTO } from './DTO/create-order.dto';
import { OrderEntity } from './entity/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly paymentService: PaymentService,
    private readonly cartService: CartService,
    private readonly orderProductService: OrderProductService,
    private readonly productService: ProductService,
  ) {}
  async createOrder(
    createOrderDTO: CreateOrderDTO,
    cartId: number,
    userId: number,
  ): Promise<OrderEntity> {
    const payment: PaymentEntity = await this.paymentService.createPayment(
      createOrderDTO,
    );
    const order = await this.orderRepository.save({
      addressId: createOrderDTO.addressId,
      date: new Date(),
      paymentId: payment.id,
      userId,
    });
    const cart = await this.cartService.findCartByUserId(userId, true);

    const products = await this.productService.getAllProduct(
      cart.cartProduct?.map((cartProduct) => cartProduct.productId),
    );
    console.log(products);

    await Promise.all(
      cart.cartProduct?.map((cartProduct) => {
        this.orderProductService.createOrderProduct(
          cartProduct.productId,
          order.id,
          products.find((product) => product.id === cartProduct.productId)
            ?.price || 0,
          cartProduct.amount,
        );
      }),
    );

    return order;
  }
}
