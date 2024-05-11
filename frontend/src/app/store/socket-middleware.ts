import { Middleware } from 'redux';
import { socket } from './socket-slice';
import { socketInstance } from '@/shared/socket/socket';
import {
  getIncomingOrders,
  onPlaceOrderError,
  onPlaceOrderSucess,
  placeOrder,
  enterOrderRoom,
} from '@/features/order';
import { IOrder } from '@/entities/order';

export const socketMiddleware: Middleware = (store) => (next) => (action) => {
  if (socket.connect.match(action)) {
    const isAdmin =
      window.localStorage.getItem('admin') === 'true' ? true : false;

    socketInstance.on('connect', () => {
      store.dispatch(socket.connectionEstablished());
      socketInstance.id
        ? store.dispatch(socket.assignSocketId(socketInstance.id))
        : null;

      socketInstance.on('placeOrderSuccess', (data: IOrder) => {
        store.dispatch(onPlaceOrderSucess(data));
      });
      socketInstance.on('placeOrderError', (data) =>
        store.dispatch(onPlaceOrderError(data))
      );

      if (isAdmin) {
        socketInstance.on('createdOrders', (data: IOrder) => {
          store.dispatch(getIncomingOrders(data));
        });
        store.dispatch(socket.enterAdminRoom());
      }
    });
  }
  if (socket.enterAdminRoom.match(action)) {
    socketInstance.emit('joinAdminRoom');
  }
  if (getIncomingOrders.match(action)) {
    socketInstance.emit('joinOrderRoom', action.payload._id);
  }
  if (enterOrderRoom.match(action)) {
    socketInstance.emit('joinOrderRoom', action.payload._id);
  }

  if (placeOrder.match(action)) {
    socketInstance.emit('placeOrder', action.payload);
  }

  if (socket.disconnect.match(action)) {
    socketInstance.off();
  }

  next(action);
};
