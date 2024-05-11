import { NextFunction, Request, Response } from 'express';
import { Drinks, Orders } from '../db/mongoConnector.js';
import {
  ICreateOrder,
  IDrinkOrder,
} from '../interfaces/requests/ICreateOrder.js';
import { NotFound } from '../errors/NotFound.js';

// const getNextOrderNumber = (): Promise<number> => {
//   return new Promise((resolve, reject) => {
//     Orders.findOne({})
//       .sort({ orderNumber: -1 })
//       .exec((err: any, lastOrder: any) => {
//         if (err) {
//           reject(err);
//         } else {
//           let orderNumber = 1;
//           if (lastOrder) {
//             orderNumber =
//               lastOrder.orderNumber < 100 ? lastOrder.orderNumber + 1 : 1;
//           }
//           resolve(orderNumber);
//         }
//       });
//   });
// };

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
