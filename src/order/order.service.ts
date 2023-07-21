import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartService } from '../cart/cart.service';
import { CartEntity } from '../cart/entity/cart.entity';
import { OrderProductEntity } from '../order-product/entity/order-product.entity';
import { OrderProductService } from '../order-product/order-product.service';
import { PaymentEntity } from '../payment/entity/payment.entity';
import { PaymentService } from '../payment/payment.service';
import { ProductEntity } from '../product/entity/product.entity';
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

  async saveOrder(
    createOrderDTO: CreateOrderDTO,
    userId: number,
    payment: PaymentEntity,
  ): Promise<OrderEntity> {
    return this.orderRepository.save({
      addressId: createOrderDTO.addressId,
      date: new Date(),
      paymentId: payment.id,
      userId,
    });
  }

  async createOrderProductUsingCart(
    cart: CartEntity,
    orderId: number,
    products: ProductEntity[],
  ): Promise<OrderProductEntity[]> {
    const orderProducts = cart.cartProduct?.map((cartProduct) => {
      return this.orderProductService.createOrderProduct(
        cartProduct.productId,
        orderId,
        products.find((product) => product.id === cartProduct.productId)
          ?.price || 0,
        cartProduct.amount,
      );
    });

    return Promise.all(orderProducts);
  }

  async createOrder(
    createOrderDTO: CreateOrderDTO,
    userId: number,
  ): Promise<OrderEntity> {
    const cart = await this.cartService.findCartByUserId(userId, true);

    const product = await this.productService.getAllProduct(
      cart.cartProduct?.map((cartProduct) => cartProduct.productId),
    );

    const payment: PaymentEntity = await this.paymentService.createPayment(
      createOrderDTO,
      product,
      cart,
    );

    const order = await this.saveOrder(createOrderDTO, userId, payment);
    await this.createOrderProductUsingCart(cart, order.id, product);
    await this.cartService.clearCart(userId);

    return order;
  }
  async findOrderByUserId(userId: number): Promise<OrderEntity[]> {
    const order = await this.orderRepository.find({
      where: {
        userId,
      },
      relations: {
        address: true,
        ordersProduct: {
          product: true,
        },
        payment: {
          paymentStatus: true,
        },
      },
    });
    if (!order || order.length === 0) {
      throw new NotFoundException('Orders not found');
    }
    return order;
  }
}
