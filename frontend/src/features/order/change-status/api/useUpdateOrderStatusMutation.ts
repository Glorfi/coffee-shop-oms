import { useAppDispatch, useAppSelector } from '@/shared/utils/hooks';
import { IOrder } from '@/entities/order';
import { updateOrderStatus } from '../../api/orderSocketSlice';
import { useEffect, useState } from 'react';

export const useUpdateOrderStatusMutation = () => {
  const dispatch = useAppDispatch();

  const data = useAppSelector(
    (state) => state.socket.orders.updateOrderStatus.data
  );
  const error = useAppSelector(
    (state) => state.socket.orders.updateOrderStatus.error
  );

  const updateOrder = (order: IOrder) => {
    dispatch(updateOrderStatus(order));
  };

  return [updateOrder, { data, error }] as const;
};
