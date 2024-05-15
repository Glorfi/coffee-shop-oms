import { setInitialOrderList } from '@/entities/order';
import {
  AdminOrderCard,
  enterOrderRoom,
  useGetTodayOrdersQuery,
} from '@/features/order';
import { useAppDispatch, useAppSelector } from '@/shared/utils/hooks';
import { Badge, Grid, Tag, VStack, Text, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export const AdminOrderBoard = (): JSX.Element => {
  // const incomingOrder = useAppSelector(
  //   (state) => state.socket.orders.incomingOrder
  // );
  const { data } = useGetTodayOrdersQuery();
  const dispatch = useAppDispatch();
  const orderList = useAppSelector((state) => state.orderList);
  // useEffect(() => {
  //   incomingOrder ? setOrderList([...orderList, incomingOrder]) : null;
  // }, [incomingOrder]);

  useEffect(() => {
    if (data && orderList.length === 0) {
      dispatch(setInitialOrderList(data));
      data.forEach((item) => {
        if (item.status !== 'delivered') {
          dispatch(enterOrderRoom(item));
        }
      });
    }
  }, [data]);

  return (
    <Grid
      gridTemplateColumns={'1fr 1fr 1fr 1fr'}
      gap={'10px'}
      w={'100%'}
      maxWidth={'1200px'}
      m={'20px auto 0'}
      p={['0 10px', '0']}
      zIndex={'-5'}
      overflowX={['scroll', 'scroll', 'scroll', 'scroll', 'unset']}
    >
      <VStack
        w={'100%'}
        borderRadius={'10'}
        backgroundColor={'whiteAlpha.600'}
        backdropFilter={'blur(2px)'}
        p={'10px'}
      >
        <Badge colorScheme="blue" w={'100%'} textAlign={'center'}>
          Входящие
        </Badge>
        {orderList
          .filter((item) => item.status === 'created')
          .map((order) => (
            <AdminOrderCard order={order} key={`order-${order._id}`} />
          ))}
      </VStack>
      <VStack
        w={'100%'}
        borderRadius={'10'}
        backgroundColor={'whiteAlpha.600'}
        backdropFilter={'blur(2px)'}
        p={'10px'}
      >
        <Badge colorScheme="orange" w={'100%'} textAlign={'center'}>
          Готовятся
        </Badge>
        {orderList
          .filter((item) => item.status === 'processing')
          .map((order) => (
            <AdminOrderCard order={order} key={`order-${order._id}`} />
          ))}
      </VStack>
      <VStack
        w={'100%'}
        borderRadius={'10'}
        backgroundColor={'whiteAlpha.600'}
        backdropFilter={'blur(2px)'}
        p={'10px'}
      >
        <Badge colorScheme="darkGreen" w={'100%'} textAlign={'center'}>
          Готово
        </Badge>
        {orderList
          .filter((item) => item.status === 'ready')
          .map((order) => (
            <AdminOrderCard order={order} key={`order-${order._id}`} />
          ))}
      </VStack>
      <VStack
        w={'100%'}
        borderRadius={'10'}
        backgroundColor={'whiteAlpha.600'}
        backdropFilter={'blur(2px)'}
        p={'10px'}
      >
        <Badge colorScheme="purple" w={'100%'} textAlign={'center'}>
          Выдано
        </Badge>
        {orderList
          .filter((item) => item.status === 'delivered')
          .map((order) => (
            <AdminOrderCard order={order} key={`order-${order._id}`} />
          ))}
      </VStack>
    </Grid>
  );
};
