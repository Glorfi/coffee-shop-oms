import { NextFunction, Request, Response } from 'express';
import { Drinks, Orders } from '../db/mongoConnector.js';
import {
  ICreateOrder,
  IDrinkOrder,
} from '../interfaces/requests/ICreateOrder.js';
import { NotFound } from '../errors/NotFound.js';

export const getTodayOrders = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  Orders.find({ createdAt: { $gte: today } })
    .populate({ path: 'drinks.drink', model: 'drinks' })
    .then((orders) => res.send(orders))
    .catch((err) => next(err));
};

export const getOrderById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Orders.findById(req.params.id)
    .populate({ path: 'drinks.drink', model: 'drinks' })
    .then((order: any) => {
      if (!order) {
        throw new NotFound('Order is not found');
      }
      res.send(order);
    })
    .catch((err) => next(err));
};

export const placeOrder = (
  req: ICreateOrder,
  res: Response,
  next: NextFunction
) => {
  const orderData = {
    ...(req.body as any),
    status: 'created',
  };

  Orders.findOne({}, { orderNumber: 1 }, { sort: { orderNumber: -1 } })
    .then((maxOrder: any) => {
      if (!maxOrder) {
        orderData.orderNumber = 1;
      } else {
        orderData.orderNumber = (maxOrder.orderNumber % 99) + 1;
      }
      return Orders.create(orderData);
    })
    .then((order) => {
      return Orders.populate(order, { path: 'drinks.drink', model: 'drinks' });
    })
    .then((populatedOrder) => {
      res.send(populatedOrder);
    })
    .catch((err) => {
      next(err);
    });
};

export const placeOrderSocket = (
  orderData: IDrinkOrder,
  res: any,
  next: any
) => {
  orderData.status = 'created';

  Orders.findOne({}, { orderNumber: 1 }, { sort: { orderNumber: -1 } })
    .then((maxOrder: any) => {
      if (!maxOrder) {
        orderData.orderNumber = 1;
      } else {
        orderData.orderNumber = (maxOrder.orderNumber % 99) + 1;
      }
      return Orders.create(orderData);
    })
    .then((order) => {
      return Orders.populate(order, { path: 'drinks.drink', model: 'drinks' });
    })
    .then((populatedOrder) => {
      res(populatedOrder);
    })
    .catch((err) => {
      next(err);
    });
};
