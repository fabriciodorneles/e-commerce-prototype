import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customerFinded = await this.customersRepository.findById(customer_id);
    if (!customerFinded) {
      throw new AppError('Error, this customer does not exists', 400);
    }
    const productsInOrder = await this.productsRepository.findAllById(products);
    if (productsInOrder.length < products.length) {
      throw new AppError('There is an invalid product on order.');
    }

    const productsWithUpdatedQuantities: IUpdateProductsQuantityDTO[] = [];

    productsInOrder.forEach(product => {
      products.forEach(productInOrder => {
        if (product.id === productInOrder.id) {
          if (product.quantity - productInOrder.quantity < 0) {
            throw new AppError('There is an invalid product on order.');
          } else {
            productsWithUpdatedQuantities.push({
              id: product.id,
              quantity: product.quantity - productInOrder.quantity,
            });
          }
        }
      });
    });

    await this.productsRepository.updateQuantity(productsWithUpdatedQuantities);

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: productsInOrder.filter(prod => prod.id === product.id)[0].price,
    }));

    const order = await this.ordersRepository.create({
      customer: customerFinded,
      products: serializedProducts,
    });

    return order;
  }
}

export default CreateOrderService;
