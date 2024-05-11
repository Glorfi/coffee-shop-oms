import { useAppDispatch, useAppSelector } from '@/shared/utils/hooks';
import { placeOrder } from '../../api/OrderSocketSlice';
import { IOrderForm } from '@/entities/order';

export const usePlaceOrderMutation = () => {
  const dispatch = useAppDispatch();

  const sendOrder = (order: IOrderForm) => {
    dispatch(placeOrder(order));
  };
  const data = useAppSelector((state) => state.socket.orders.placeOrder.data);
  const error = useAppSelector((state) => state.socket.orders.placeOrder.error);
  return [sendOrder, { data, error }] as const;
};
