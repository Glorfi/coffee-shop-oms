import { DrinkOrderItem } from '@/entities/drink';
import { useAppDispatch, useAppSelector } from '@/shared/utils/hooks';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import { useEffect } from 'react';

import { QuantityToggler, usePlaceOrderMutation } from '@/features/order';
import { socketInstance } from '@/shared/socket/socket';
import { useNavigate } from 'react-router-dom';
import {
  BUTTON_MAKE_ORDER_TITLE,
  BUTTON_OPEN_TITLE,
} from './locolized-ui-titles';

export const CreateOrderDrawer = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const orderForm = useAppSelector((state) => state.orderForm);
  const lang = useAppSelector((state) => state.lang.value);
  const [sendOrder, { data, error }] = usePlaceOrderMutation();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    sendOrder(orderForm);
  };

  useEffect(() => {
    if (data) {
      console.log(data);
      navigate(`/orders/${data._id}`);
    }
  }, [data]);

  useEffect(() => {
    orderForm.drinks.length === 0 ? onClose() : null;
  }, [orderForm.drinks.length]);

  return (
    <>
      <Box
        w={'100%'}
        display={orderForm.drinks.length > 0 && !isOpen ? 'block' : 'none'}
        position={'fixed'}
        bottom={0}
        p={'16px 24px'}
        borderRadius={'10'}
        bgColor={'whiteAlpha.900'}
        backdropFilter={'blur(2px)'}
        maxW={'580px'}
        m={'0 auto'}
        zIndex={10}
      >
        <Button
          display={'grid'}
          colorScheme="darkGreen"
          onClick={onOpen}
          w={'100%'}
          gridTemplateColumns={'1fr 1fr 1fr'}
        >
          <Text fontWeight={'semibold'} gridColumn={2}>
            {BUTTON_OPEN_TITLE[lang]}
          </Text>

          <Text
            justifySelf={'flex-end'}
            fontWeight={'normal'}
            gridColumn={3}
          >{`${orderForm.totalPrice} ֏`}</Text>
        </Button>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        size={'lg'}
        blockScrollOnMount={false}
      >
        <DrawerOverlay backgroundColor={'blackAlpha.200'} />
        <DrawerContent
          borderRadius={'10'}
          backgroundColor={'whiteAlpha.900'}
          backdropFilter={'blur(2px)'}
          maxW={'580px !important'}
          m={'0 auto'}
          left={'-10'}
        >
          <DrawerCloseButton />
          <DrawerHeader pb={0}>{BUTTON_OPEN_TITLE[lang]}</DrawerHeader>

          <DrawerBody>
            {orderForm.drinks.map((orderItem, index) => (
              <DrinkOrderItem
                orderItem={orderItem}
                lang={lang}
                key={`orderItem${orderItem.drink._id}-${index}`}
                toggleFeature={QuantityToggler}
              />
            ))}
          </DrawerBody>

          <DrawerFooter
            display={'grid'}
            gridTemplateColumns={'1fr 1fr 1fr 1fr'}
            gap={'10px'}
            padding={'0 24px 16px'}
          >
            <Text
              fontWeight={'bold'}
              fontSize={'xl'}
            >{`${orderForm.totalPrice} ֏`}</Text>
            <Button
              colorScheme="darkGreen"
              gridColumn={'2/5'}
              onClick={handlePlaceOrder}
            >
              {BUTTON_MAKE_ORDER_TITLE[lang]}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
