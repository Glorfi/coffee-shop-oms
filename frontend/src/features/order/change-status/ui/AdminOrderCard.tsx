import { DrinkOrderItemAdmin } from '@/entities/drink';
import { IOrder } from '@/entities/order';
import { useAppSelector } from '@/shared/utils/hooks';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { VStack, Text, Box, HStack, Grid, IconButton } from '@chakra-ui/react';

interface IAdminOrderCard {
  order: IOrder;
}

export const AdminOrderCard = (props: IAdminOrderCard): JSX.Element => {
  const { order } = props;
  const date = new Date(order.createdAt);
  const lang = useAppSelector((state) => state.lang.value);
  const cardColorByStatus = {
    created: 'blue',
    processing: 'orange',
    ready: 'darkGreen',
    delivered: 'purple',
  };

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
          visibility={order.status !== "created" ? "visible" : "hidden"} 
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
          visibility={order.status !== "delivered" ? "visible" : "hidden"} 
        />
      </Grid>
      <Box width={'100%'}>
        <Text
          fontSize={'sm'}
          // fontWeight={'bold'}
          color={'primary'}
        >{`Cоздан: ${date.toLocaleTimeString().slice(0, -3)}`}</Text>
        <Text fontSize={'sm'} color={'primary'}>{`ID: ${order._id}`}</Text>
      </Box>
      {order.drinks.map((drink) => (
        <DrinkOrderItemAdmin
          orderItem={drink}
          lang={lang}
          cardColor={cardColorByStatus[order.status]}
        />
        // <Grid
        //   gap={0}
        //   templateColumns={'3fr 1fr'}
        //   bgColor={'blue.200'}
        //   p={'10px'}
        //   w={'100%'}
        //   borderRadius={10}
        // >
        //   <Text fontSize={'lg'} fontWeight={'bold'} color={'primary'}>
        //     {drink.drink.nameRU}
        //   </Text>
        //   <Text
        //     fontSize={'lg'}
        //     fontWeight={'bold'}
        //     color={'primary'}
        //     justifySelf={'end'}
        //   >
        //     {`x${drink.quantity}`}
        //   </Text>
        //   <Text
        //     fontSize={'sm'}
        //     //  fontWeight={'bold'}
        //     color={'primary'}
        //   >
        //     {`${drink.variant} ${drink.size}`}
        //   </Text>
        //   <Text
        //     fontSize={'sm'}
        //     //  fontWeight={'bold'}
        //     color={'primary'}
        //     justifySelf={'end'}
        //   >
        //     {`${drink.price * drink.quantity} ֏`}
        //   </Text>
        // </Grid>
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
