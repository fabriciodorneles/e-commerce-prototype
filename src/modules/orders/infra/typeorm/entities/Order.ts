import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';

class Order {
  id: string;

  @ManyToOne
  customer: Customer;

  @OneToMany
  order_products: OrdersProducts[];

  created_at: Date;

  updated_at: Date;
}

export default Order;
