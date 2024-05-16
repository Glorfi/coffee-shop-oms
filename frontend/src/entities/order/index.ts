export type { IOrder, IOrderForm } from './model/types';
export {
  orderFormSlice,
  addDrinkToOrder,
  incrementDrinkQuantity,
  decrementDrinkQuantity,
} from './model/orderFormSlice';

export {
  orderListSlice,
  addItemToOrderList,
  setInitialOrderList,
  replaceOrder,
} from './model/orderListSlice';
