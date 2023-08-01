import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorator/roles.decorator';
import { UserId } from '../decorator/user-id.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { CreateOrderDTO } from './DTO/create-order.dto';
import { ReturnOrderDTO } from './DTO/return-order.dto';
import { OrderEntity } from './entity/order.entity';
import { OrderService } from './order.service';

@ApiTags('order')
@ApiBearerAuth()
@UsePipes(ValidationPipe)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Create a new order (for Root and Admin users)' })
  @Post()
  @Roles(UserType.Root, UserType.Admin, UserType.User)
  async createOrder(
    @Body() createOrderDTO: CreateOrderDTO,
    @UserId() userId: number,
  ): Promise<OrderEntity> {
    return this.orderService.createOrder(createOrderDTO, userId);
  }

  @ApiOperation({
    summary: 'Find orders by user ID (for Root and Admin users)',
  })
  @Roles(UserType.Root, UserType.Admin, UserType.User)
  @Get()
  async findOrderByUserId(@UserId() userId: number): Promise<OrderEntity[]> {
    return this.orderService.findOrderByUserId(userId);
  }

  @ApiOperation({ summary: 'Find all orders (for Root and Admin )' })
  @Roles(UserType.Root, UserType.Admin)
  @Get('all')
  async findAllOrder(): Promise<ReturnOrderDTO[]> {
    return (await this.orderService.findAllOrder()).map(
      (order) => new ReturnOrderDTO(order),
    );
  }

  @ApiOperation({
    summary: 'Find order by order ID (for Root and Admin )',
  })
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
