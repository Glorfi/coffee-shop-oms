import { useAppSelector } from '@/shared/utils/hooks';

export const useGetCurrentOrder = () => {
  const currentOrder = useAppSelector(
    (state) => state.socket.orders.placeOrder.data
  );
  return currentOrder;
};
