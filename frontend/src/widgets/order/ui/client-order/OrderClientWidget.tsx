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
import {
  Progress,
  Text,
  VStack,
  Image,
  Stack,
  Skeleton,
} from '@chakra-ui/react';
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
  const orderSubscription = useAppSelector(
    (state) => state.socket.orders.updateOrderStatus.data
  );
  const lang = useAppSelector((state) => state.lang.value);
  const dispatch = useAppDispatch();

  const [order, setOrder] = useState<IOrder | null>(currentOrder);
  const [title, setTitle] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string>('');
  const [progress, setProgress] = useState<number>(10);

  useEffect(() => {
    if (!currentOrder) {
      getOrder({ id });
    }
  }, []);

  useEffect(() => {
    if (data) {
      setOrder(data);
      // setTitle(ORDER_WIDGET_TITLE[data.status][lang]);
      // setSubtitle(ORDER_WIDGET_SUBTITLE[data.status][lang]);
      if (data.status === 'created') {
        setProgress(10);
      }
      if (data.status === 'processing') {
        setProgress(50);
      }
      if (data.status === 'ready') {
        setProgress(80);
      }
      if (data.status === 'delivered') {
        setProgress(100);
      }
      dispatch(enterOrderRoom(data));
    }
  }, [data]);

  useEffect(() => {
    if (orderSubscription) {
      setOrder(orderSubscription);
      if (orderSubscription.status === 'created') {
        setProgress(10);
      }
      if (orderSubscription.status === 'processing') {
        setProgress(50);
      }
      if (orderSubscription.status === 'ready') {
        setProgress(80);
      }
      if (orderSubscription.status === 'delivered') {
        setProgress(100);
      }
    }
  }, [orderSubscription, lang]);

  useEffect(() => {
    if (currentOrder) {
      setOrder(currentOrder);
    }
  }, [currentOrder]);

  useEffect(() => {
    if (order) {
      setTitle(ORDER_WIDGET_TITLE[order.status][lang]);
      setSubtitle(ORDER_WIDGET_SUBTITLE[order.status][lang]);
    }
  }, [order, lang]);
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
      {isLoading ? (
        <Stack w={'100%'}>
          <Skeleton height="90px" width={'30%'} alignSelf={"center"} />
          <Skeleton height="45px" />
          <Skeleton height="45px" />
          <Skeleton height="12px" />
          <Skeleton height="58px" />
          <Skeleton height="36px" w={"25%"}/>
        </Stack>
      ) : null}
      {order ? (
        <>
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
            {title}
          </Text>
          <Text
            color={'darkGreen.500'}
            fontSize={'md'}
            fontWeight={'bold'}
            textAlign={'center'}
          >
            {subtitle}
          </Text>
          <Progress
            value={progress}
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
        </>
      ) : null}
    </VStack>
  );
};
