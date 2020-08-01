import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import FindOrderService from '@modules/orders/services/FindOrderService';

export default class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const test = 'oi';
    return response.json(test);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const test = 'oi';
    return response.json(test);
  }
}
