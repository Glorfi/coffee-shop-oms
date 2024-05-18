import { DrinkOrderItemAdmin } from '@/entities/drink';
import { IOrder, replaceOrder } from '@/entities/order';
import { useAppDispatch, useAppSelector } from '@/shared/utils/hooks';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { VStack, Text, Box, HStack, Grid, IconButton } from '@chakra-ui/react';
import { useUpdateOrderStatusMutation } from '../api/useUpdateOrderStatusMutation';
import { useEffect, useState } from 'react';

interface IAdminOrderCard {
  order: IOrder;
}

export const AdminOrderCard = (props: IAdminOrderCard): JSX.Element => {
  const { order } = props;
  const createdAt = new Date(order.createdAt);
  const updatedAt = new Date(order.updatedAt);
  const lang = useAppSelector((state) => state.lang.value);

  const cardColorByStatus = {
    created: 'blue',
    processing: 'orange',
    ready: 'darkGreen',
    delivered: 'purple',
  };
  const [updateOrder, { data, error }] = useUpdateOrderStatusMutation();
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const statusList: Array<IOrder['status']> = [
    'created',
    'processing',
    'ready',
    'delivered',
  ];

  function handleForwardUpdateClick() {
    const currentStatusIndex = statusList.indexOf(order.status);
    if (currentStatusIndex !== -1) {
      const nextStatusIndex = currentStatusIndex + 1;
      updateOrder({ ...order, status: statusList[nextStatusIndex] });
    }
  }

  function handleBackwardUpdateClick() {
    const currentStatusIndex = statusList.indexOf(order.status);
    if (currentStatusIndex !== -1) {
      const previousStatusIndex = currentStatusIndex - 1;
      updateOrder({ ...order, status: statusList[previousStatusIndex] });
    }
  }

  return (
    <VStack
      width={'100%'}
      maxW={'300px'}
      borderRadius={10}
      padding={'10px'}
      backgroundColor={`${cardColorByStatus[order.status]}.100`}
      alignItems={'flex-start'}
      gap={'8px'}
    >
      <Grid templateColumns={'1fr 1fr f1r'} w={'100%'}>
        <IconButton
          aria-label="backward"
          gridColumn={1}
          justifySelf={'start'}
          isRound
          icon={<ArrowBackIcon />}
          colorScheme={cardColorByStatus[order.status]}
          size={'sm'}
          width={'fit-content'}
          visibility={order.status !== 'created' ? 'visible' : 'hidden'}
          onClick={handleBackwardUpdateClick}
        />

        <Text
          fontSize={'lg'}
          fontWeight={'bold'}
          color={'primary'}
          justifySelf={'center'}
          gridColumn={2}
        >{`Заказ №${order.orderNumber}`}</Text>

        <IconButton
          aria-label="forward"
          width={'fit-content'}
          justifySelf={'end'}
          gridColumn={3}
          isRound
          icon={<ArrowForwardIcon />}
          colorScheme={cardColorByStatus[order.status]}
          variant={'solid'}
          size={'sm'}
          visibility={order.status !== 'delivered' ? 'visible' : 'hidden'}
          onClick={handleForwardUpdateClick}
        />
      </Grid>
      <Box width={'100%'}>
        <Text
          fontSize={'sm'}
          // fontWeight={'bold'}
          color={'primary'}
        >{`Cоздан: ${createdAt.toLocaleTimeString().slice(0, -3)}`}</Text>
                <Text
          fontSize={'sm'}
          // fontWeight={'bold'}
          color={'primary'}
        >{`Обновлен: ${updatedAt.toLocaleTimeString().slice(0, -3)}`}</Text>
        <Text fontSize={'sm'} color={'primary'}>{`ID: ${order._id}`}</Text>
      </Box>
      {order.drinks.map((drink) => (
        <DrinkOrderItemAdmin
          orderItem={drink}
          lang={lang}
          cardColor={cardColorByStatus[order.status]}
          key={`${order._id}_${drink.drink._id}`}
        />
      ))}
      <Text
        fontSize={'lg'}
        fontWeight={'bold'}
        color={'primary'}
        alignSelf={'end'}
      >
        {`${order.totalPrice} ֏`}
      </Text>
    </VStack>
  );
};
