import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import Order from '@modules/orders/infra/typeorm/entities/Order';
import Product from '@modules/products/infra/typeorm/entities/Product';

@Entity()
class OrdersProducts {
  @PrimaryGeneratedColumn()
  id!: string;

  @ManyToOne(() => Order, order => order.order_products)
  order!: Order;

  @ManyToOne(() => Product, product => product.order_products)
  product!: Product;

  @Column()
  @JoinColumn()
  product_id!: string;

  @Column()
  order_id!: string;

  @Column()
  price!: number;

  @Column()
  quantity!: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OrdersProducts;
