import { ApiProperty } from '@nestjs/swagger';
import { ReturnOrderDTO } from '../../order/DTO/return-order.dto';
import { ReturnProduct } from '../../product/DTO/return-product.dto';
import { OrderProductEntity } from '../entity/order-product.entity';

export class ReturnOrderProductDTO {
  @ApiProperty({
    description: 'ID of the order product',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'ID of the associated order',
    example: 10,
  })
  orderId: number;

  @ApiProperty({
    description: 'ID of the associated product',
    example: 20,
  })
  productId: number;

  @ApiProperty({
    description: 'Amount of the product in the order',
    example: 3,
  })
  amount: number;

  @ApiProperty({
    description: 'Price of the product in the order',
    example: 29.99,
  })
  price: number;

  @ApiProperty({
    description: 'Associated order details',
  })
  order?: ReturnOrderDTO;

  @ApiProperty({
    description: 'Associated product details',
  })
  product?: ReturnProduct;

  constructor(orderProduct: OrderProductEntity) {
    this.id = orderProduct.id;
    this.orderId = orderProduct.orderId;
    this.productId = orderProduct.productId;
    this.amount = orderProduct.amount;
    this.price = orderProduct.price;
    this.order = orderProduct.order
      ? new ReturnOrderDTO(orderProduct.order)
      : undefined;
    this.product = orderProduct.product
      ? new ReturnProduct(orderProduct.product)
      : undefined;
  }
}
