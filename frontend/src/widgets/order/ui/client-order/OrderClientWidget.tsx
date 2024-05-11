import { DrinkMenuLine, DrinkOrderItem } from '@/entities/drink';
import { IOrder } from '@/entities/order';
import {
  QuantityToggler,
  enterOrderRoom,
  useGetCurrentOrder,
  useGetOrderByIdQuery,
  useLazyGetOrderByIdQuery,
} from '@/features/order';
import { useAppDispatch, useAppSelector } from '@/shared/utils/hooks';
import { Progress, Text, VStack, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ORDER_WIDGET_SUBTITLE,
  ORDER_WIDGET_TITLE,
} from './locolized-ui-titles';

export const OrderClientWidget = (): JSX.Element => {
  const { id } = useParams();
  const [getOrder, { data, isLoading, isSuccess }] = useLazyGetOrderByIdQuery();
  const currentOrder = useGetCurrentOrder();
  const lang = useAppSelector((state) => state.lang.value);
  const dispatch = useAppDispatch();

  const [order, setOrder] = useState<IOrder | null>(currentOrder);

  useEffect(() => {
    if (!currentOrder) {
      getOrder({ id });
    }
  }, []);

  useEffect(() => {
    if (data) {
      setOrder(data);
      dispatch(enterOrderRoom(data));
    }
  }, [data]);

  return (
    <VStack
      alignItems={'center'}
      w={'100%'}
      mt={'30px'}
      borderRadius={'10'}
      backgroundColor={'whiteAlpha.600'}
      backdropFilter={'blur(2px)'}
      p={'10px'}
    >
      <Text
        color={'darkGreen.500'}
        fontSize={'6xl'}
        fontWeight={'bold'}
        mt={'20px'}
      >
        {`№${order?.orderNumber}`}
      </Text>
      <Text
        color={'darkGreen.500'}
        fontSize={'3xl'}
        fontWeight={'bold'}
        textAlign={'center'}
      >
        {ORDER_WIDGET_TITLE[lang]}
      </Text>
      <Text
        color={'darkGreen.500'}
        fontSize={'xs'}
        fontWeight={'bold'}
        textAlign={'center'}
      >
        {ORDER_WIDGET_SUBTITLE[lang]}
      </Text>
      <Progress
        value={10}
        w={'100%'}
        borderRadius={'10'}
        colorScheme="darkGreen"
        size={'md'}
      />
      {order &&
        order.drinks.map((orderItem, index) => (
          <DrinkOrderItem
            orderItem={orderItem}
            lang={lang}
            key={`${orderItem.drink._id}-${index}`}
            toggleFeature={QuantityToggler}
            readonly
          />
        ))}
      <Text
        color={'darkGreen.500'}
        fontSize={'2xl'}
        fontWeight={'bold'}
        alignSelf={'flex-start'}
      >
        {/* {`Итого к оплате: ${order?.totalPrice} ֏`} */}
        {`${order?.totalPrice} ֏`}
      </Text>
    </VStack>
  );
};
