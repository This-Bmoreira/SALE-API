import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AddressEntity } from '../../address/entity/address.entity';
import { OrderEntity } from '../../order/entity/order.entity';

@Entity({
  name: 'user',
})
export class UserEntity {
  @PrimaryGeneratedColumn('rowid')
  id?: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({ name: 'cpf', nullable: false })
  cpf: string;

  @Column({ name: 'type_user', nullable: false })
  typeUser: number;

  @Column({ name: 'phone' })
  phone?: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date;

  @OneToMany(() => AddressEntity, (address) => address.user)
  addresses?: AddressEntity[];

  @ManyToMany(() => OrderEntity, (order) => order.address)
  orders?: OrderEntity[];
}
