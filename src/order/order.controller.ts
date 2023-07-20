import {
  Body,
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserId } from '../decorator/user-id.decorator';
import { CreateOrderDTO } from './DTO/create-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UsePipes(ValidationPipe)
  @Post('/cart/:cartId')
  async createOrder(
    @Body() createOrderDTO: CreateOrderDTO,
    @Param('cartId') cartId: number,
    @UserId() userId: number,
  ) {
    return this.orderService.createOrder(createOrderDTO, cartId, userId);
  }
}
