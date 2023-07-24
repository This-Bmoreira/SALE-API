import { ReturnUserDTO } from '../../user/DTO/return-user.dto';
import { OrderEntity } from '../entity/order.entity';

export class ReturnOrderDTO {
  id: number;
  date: string;
  user?: ReturnUserDTO;

  constructor(order?: OrderEntity) {
    this.id = order?.id;
    this.date = order?.date.toString();
    this.user = order?.user ? new ReturnUserDTO(order?.user) : undefined;
  }
}
