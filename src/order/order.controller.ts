import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../decorator/roles.decorator';
import { UserId } from '../decorator/user-id.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { CreateOrderDTO } from './DTO/create-order.dto';
import { ReturnOrderDTO } from './DTO/return-order.dto';
import { OrderEntity } from './entity/order.entity';
import { OrderService } from './order.service';

@Roles(UserType.Root, UserType.Admin, UserType.User)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createOrder(
    @Body() createOrderDTO: CreateOrderDTO,
    @UserId() userId: number,
  ): Promise<OrderEntity> {
    return this.orderService.createOrder(createOrderDTO, userId);
  }
  @Get()
  async findOrderByUserId(@UserId() userId: number): Promise<OrderEntity[]> {
    return this.orderService.findOrderByUserId(userId);
  }
  @Roles(UserType.Root, UserType.Admin)
  @Get('all')
  async findAllOrder(): Promise<ReturnOrderDTO[]> {
    return (await this.orderService.findAllOrder()).map(
      (order) => new ReturnOrderDTO(order),
    );
  }
  @Roles(UserType.Root, UserType.Admin)
  @Get(':orderId')
  async findOrderById(
    @Param('orderId') orderId: number,
  ): Promise<ReturnOrderDTO> {
    return new ReturnOrderDTO(
      (await this.orderService.findOrderByUserId(undefined, orderId))[0],
    );
  }
}
