import { getRepository, Repository } from 'typeorm';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import AppError from '@shared/errors/AppError';
import Order from '../entities/Order';
// import OrdersProducts from '../entities/OrdersProducts';

class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async create({ customer, products }: ICreateOrderDTO): Promise<Order> {
    const product = this.ormRepository.create({
      order_products: products,
      customer,
    });

    console.log('product gerado pelo create:', product);
    await this.ormRepository.save(product);
    return product;
  }

  public async findById(id: string): Promise<Order | undefined> {
    const order = this.ormRepository.findOne(id);

    if (!order) {
      throw new AppError('Order dont exists.');
    }

    return order;
  }
}

export default OrdersRepository;
