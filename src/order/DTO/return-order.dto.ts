import { ReturnAddressDTO } from '../../address/DTO/return-address.dto';
import { ReturnOrderProductDTO } from '../../order-product/DTO/return-order-product.dto';
import { ReturnPaymentDTO } from '../../payment/DTO/return-payment.dto';
import { ReturnUserDTO } from '../../user/DTO/return-user.dto';
import { OrderEntity } from '../entity/order.entity';

export class ReturnOrderDTO {
  id: number;
  date: string;
  user?: ReturnUserDTO;
  ordersProduct?: ReturnOrderProductDTO[];
  userId: number;
  addressId: number;
  paymentId: number;
  address?: ReturnAddressDTO;
  payment?: ReturnPaymentDTO;
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
