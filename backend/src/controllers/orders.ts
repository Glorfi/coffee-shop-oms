import { NextFunction, Response } from 'express';
import { Drinks, Orders } from '../db/mongoConnector.js';
import { ICreateOrder } from '../interfaces/requests/ICreateOrder.js';

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

export const placeOrder = (
  req: ICreateOrder,
  res: Response,
  next: NextFunction
) => {
  const orderData = {
    ...(req.body as any),
    status: 'created',
  };

  Orders.findOne({}, { orderNumber: 1 }, { sort: { orderNumber: -1 } }) // Найти максимальный порядковый номер заказа
    .then((maxOrder: any) => {
      if (!maxOrder) {
        orderData.orderNumber = 1; // Если нет заказов в базе данных, начните с 1
      } else {
        orderData.orderNumber = (maxOrder.orderNumber % 99) + 1; // Увеличить порядковый номер заказа на 1, перезапустить при достижении 99
      }
      return Orders.create(orderData); // Создать заказ
    })
    .then((order) => {
      return Orders.populate(order, { path: 'drinks.drink', model: 'drinks' }); // Заполнить данные о напитках в заказе
    })
    .then((populatedOrder) => {
      res.send(populatedOrder); // Отправить ответ с заполненным заказом
    })
    .catch((err) => {
      next(err); // Обработать ошибку
    });
};
