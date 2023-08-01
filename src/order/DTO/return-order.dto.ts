import { ApiProperty } from '@nestjs/swagger';
import { ReturnAddressDTO } from '../../address/DTO/return-address.dto';
import { ReturnOrderProductDTO } from '../../order-product/DTO/return-order-product.dto';
import { ReturnPaymentDTO } from '../../payment/DTO/return-payment.dto';
import { ReturnUserDTO } from '../../user/DTO/return-user.dto';
import { OrderEntity } from '../entity/order.entity';

export class ReturnOrderDTO {
  @ApiProperty({
    description: 'ID do pedido',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Data do pedido',
    example: '2023-07-30',
  })
  date: string;

  @ApiProperty({
    description: 'Informações sobre o usuário associado ao pedido (opcional)',
    type: ReturnUserDTO,
  })
  user?: ReturnUserDTO;

  @ApiProperty({
    description: 'Produtos associados ao pedido (opcional)',
    type: [ReturnOrderProductDTO],
  })
  ordersProduct?: ReturnOrderProductDTO[];

  @ApiProperty({
    description: 'ID do usuário associado ao pedido',
    example: 2,
  })
  userId: number;

  @ApiProperty({
    description: 'ID do endereço associado ao pedido',
    example: 3,
  })
  addressId: number;

  @ApiProperty({
    description: 'ID do pagamento associado ao pedido',
    example: 4,
  })
  paymentId: number;

  @ApiProperty({
    description: 'Informações sobre o endereço associado ao pedido (opcional)',
    type: ReturnAddressDTO,
  })
  address?: ReturnAddressDTO;

  @ApiProperty({
    description: 'Informações sobre o pagamento associado ao pedido (opcional)',
    type: ReturnPaymentDTO,
  })
  payment?: ReturnPaymentDTO;

  @ApiProperty({
    description: 'Quantidade de produtos no pedido (opcional)',
    example: 3,
  })
  amountProducts?: number;

  constructor(order?: OrderEntity) {
    this.id = order?.id;
    this.date = order?.date.toString();
    this.user = order?.user ? new ReturnUserDTO(order?.user) : undefined;
    this.userId = order?.userId;
    this.addressId = order?.addressId;
    this.paymentId = order?.paymentId;
    this.address = order?.address
      ? new ReturnAddressDTO(order?.address)
      : undefined;
    this.payment = order?.payment
      ? new ReturnPaymentDTO(order?.payment)
      : undefined;
    this.ordersProduct = order?.ordersProduct
      ? order?.ordersProduct.map(
          (orderProduct) => new ReturnOrderProductDTO(orderProduct),
        )
      : undefined;
    this.amountProducts = order?.amountProducts;
  }
}
