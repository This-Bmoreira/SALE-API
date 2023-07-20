import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentService } from '../payment/payment.service';
import { CreateOrderDTO } from './DTO/create-order.dto';
import { OrderEntity } from './entity/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderEntity: Repository<OrderEntity>,
    private readonly paymentService: PaymentService,
  ) {}
  async createOrder(createOrderDTO: CreateOrderDTO, cartId: number) {
    await this.paymentService.createPayment(createOrderDTO);
    return null;
  }
}
