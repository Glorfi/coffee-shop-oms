import { DrinkOrderItem } from '@/entities/drink';
import { useAppSelector } from '@/shared/utils/hooks';
import {
  Box,
  Button,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  useDisclosure,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { QuantityToggler } from '../../../features/order/change-drink-quantity/ui/QuantityToggler';
import {
  BUTTON_MAKE_ORDER_TITLE,
  BUTTON_OPEN_TITLE,
} from '../model/locolized-ui-titles';

export const CreateOrderDrawer = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const orderForm = useAppSelector((state) => state.orderForm);
  const lang = useAppSelector((state) => state.lang.value);

  useEffect(() => {
    orderForm.drinks.length === 0 ? onClose() : null;
  }, [orderForm.drinks]);
  return (
    <>
      <Box
        w={'100%'}
        display={orderForm.drinks.length > 0 && !isOpen ? 'block' : 'none'}
        position={'fixed'}
        bottom={0}
        left={0}
        p={'16px 24px'}
        borderRadius={'10'}
        bgColor={'whiteAlpha.900'}
        backdropFilter={'blur(2px)'}
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
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose} size={'lg'}>
        <DrawerOverlay backgroundColor={'blackAlpha.200'} />
        <DrawerContent
          borderRadius={'10'}
          backgroundColor={'whiteAlpha.900'}
          backdropFilter={'blur(2px)'}
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
            <Button colorScheme="darkGreen" gridColumn={'2/5'}>
              {BUTTON_MAKE_ORDER_TITLE[lang]}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
