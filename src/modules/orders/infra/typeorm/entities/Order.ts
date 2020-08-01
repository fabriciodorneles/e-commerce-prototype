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

@Entity('order')
class Order {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Customer)
  @JoinColumn()
  customer: Customer;

  @OneToMany(() => OrdersProducts, ordersProducts => ordersProducts.order_id)
  order_products: OrdersProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;
