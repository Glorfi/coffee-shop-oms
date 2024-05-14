import { IDrink, ISelectDrink, getLocalDrinkInfo } from '@/entities/drink';
import { HotDrinkIcon } from '@/shared/ui/icons/HotDrinkIcon';
import { useAppDispatch, useAppSelector } from '@/shared/utils/hooks';
import { PhoneIcon } from '@chakra-ui/icons';
import {
  useDisclosure,
  IconButton,
  Drawer,
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
  HStack,
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
  RadioGroup,
  Radio,
  Box,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import {
  ADD_TO_CART,
  SIZE,
  SIZE_LARGE,
  SIZE_REGULAR,
  VARIANT,
  VARIANT_COLD,
  VARIANT_HOT,
} from '../model/localized-titles';

import { addDrinkToOrder } from '@/entities/order';

interface ISelectDrinkDrawer {
  drink: IDrink;
}

export const SelectDrinkDrawer = (props: ISelectDrinkDrawer): JSX.Element => {
  const { drink } = props;
  const lang = useAppSelector((state) => state.lang.value);
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  const [name, setName] = useState<string>(getLocalDrinkInfo(drink, lang).name);

  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<string>(drink.size[0].price.toString());
  const [selectedDrink, setSelectedDrink] = useState<ISelectDrink>({
    drink: drink,
    variant: drink.variant[0] === 'hot' || 'cold' ? drink.variant[0] : 'hot',
    size: drink.size[0].name,
    quantity: quantity,
    price: parseInt(price),
  });

  function handleIncrement() {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
    return;
  }
  function handleDecrement() {
    if (quantity === 1) {
      onClose();
    } else {
      setQuantity(quantity - 1);
    }
  }
  // function handleQuantityInputChange(e: ChangeEvent<HTMLInputElement>) {
  //   console.log(e.target.value);

  //   if (isNaN(parseInt(e.target.value))) {
  //     setQuantity(1);
  //   }
  //   if (parseInt(e.target.value) > 10) {
  //     setQuantity(10);
  //   }
  //   setQuantity(parseInt(e.target.value));
  // }

  function handleVariantChange(value: 'hot' | 'cold') {
    setSelectedDrink({ ...selectedDrink, variant: value });
  }

  function handleSizeChange(value: 'regular' | 'large') {
    setSelectedDrink({ ...selectedDrink, size: value });
  }

  function onAddButtonClick() {
    dispatch(addDrinkToOrder(selectedDrink));
    onClose();
  }

  useEffect(() => {
    setName(getLocalDrinkInfo(drink, lang).name);
  }, [lang]);

  useEffect(() => {
    setSelectedDrink({ ...selectedDrink, quantity: quantity });
  }, [quantity]);

  useEffect(() => {
    const drinkObj = drink.size.find(
      (item) => item.name === selectedDrink.size
    );
    if (drinkObj) {
      setPrice(drinkObj.price.toString());
      setSelectedDrink({ ...selectedDrink, price: drinkObj.price });
    }
  }, [selectedDrink.size]);

  useEffect(() => {
    if (!isOpen) {
      setPrice(drink.size[0].price.toString()),
        setSelectedDrink({
          drink: drink,
          variant: drink.variant[0],
          size: drink.size[0].name,
          quantity: 1,
          price: parseInt(price),
        });
      setQuantity(1);
    }
  }, [isOpen]);

  return (
    <>
      <IconButton
        aria-label=""
        icon={<FaPlus />}
        size={'xs'}
        colorScheme="darkGreen"
        isRound
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        blockScrollOnMount={false}
      >
        <DrawerOverlay backgroundColor={'blackAlpha.200'} />
        <DrawerContent
          borderRadius={'10'}
          backgroundColor={'whiteAlpha.900'}
          backdropFilter={'blur(2px)'}
        >
          {/* <DrawerCloseButton /> */}
          <DrawerHeader display={'grid'} gridTemplateColumns={'1fr 1fr'}>
            <Box>
              <Text fontWeight={'semibold'} fontSize="md">
                {VARIANT[lang]}
              </Text>

              <RadioGroup
                defaultValue={drink.variant[0]}
                display={'flex'}
                flexDirection={'column'}
                onChange={handleVariantChange}
              >
                {drink.variant.map((variant, index) => {
                  if (variant === 'cold') {
                    return (
                      <Radio
                        key={index}
                        value={variant}
                        colorScheme="darkGreen"
                      >
                        {VARIANT_COLD[lang]}
                      </Radio>
                    );
                  } else if (variant === 'hot') {
                    return (
                      <Radio
                        key={index}
                        value={variant}
                        colorScheme="darkGreen"
                      >
                        {VARIANT_HOT[lang]}
                      </Radio>
                    );
                  }
                  return null; // Добавьте эту строку, чтобы обработать другие варианты, если они есть
                })}
              </RadioGroup>
            </Box>
            <Box>
              <Text fontWeight={'semibold'} fontSize="md">
                {SIZE[lang]}
              </Text>
              <RadioGroup
                defaultValue={drink.size[0].name}
                display={'flex'}
                flexDirection={'column'}
                onChange={handleSizeChange}
              >
                {drink.size.map((size, index) => {
                  if (size.name === 'regular') {
                    return (
                      <Radio
                        key={index}
                        value={size.name}
                        colorScheme="darkGreen"
                      >
                        {SIZE_REGULAR[lang]}
                      </Radio>
                    );
                  } else if (size.name === 'large') {
                    return (
                      <Radio
                        key={index}
                        value={size.name}
                        colorScheme="darkGreen"
                      >
                        {SIZE_LARGE[lang]}
                      </Radio>
                    );
                  }
                  return null; // Добавьте эту строку, чтобы обработать другие варианты, если они есть
                })}
              </RadioGroup>
            </Box>
          </DrawerHeader>

          <DrawerBody display={'flex'} flexDirection={'column'} gap={'8px'}>
            <HStack justifyContent={'space-between'} w={'100%'}>
              <Text fontWeight={'bold'} fontSize="lg">
                {name}
              </Text>
              <Text fontWeight={'bold'} fontSize="lg">
                {`${price} ֏`}
              </Text>
            </HStack>
            <HStack justifyContent={'space-between'}>
              <InputGroup maxW={'100px'} border={'none'}>
                <InputLeftElement>
                  <IconButton
                    aria-label="Search database"
                    colorScheme="darkGreen"
                    icon={<FaMinus />}
                    isRound
                    variant={'ghost'}
                    onClick={handleDecrement}
                  />
                </InputLeftElement>
                <Input
                  type="number"
                  value={quantity}
                  textAlign={'center'}
                  border={'none'}
                  // onChange={handleQuantityInputChange}
                  min={1}
                  max={10}
                  readOnly
                />
                <InputRightElement>
                  <IconButton
                    aria-label="Search database"
                    colorScheme="darkGreen"
                    icon={<FaPlus />}
                    isRound
                    variant={'ghost'}
                    onClick={handleIncrement}
                    isDisabled={quantity === 10}
                  />
                </InputRightElement>
              </InputGroup>
              <Button
                colorScheme="darkGreen"
                w={'100%'}
                onClick={onAddButtonClick}
              >
                {ADD_TO_CART[lang]}
              </Button>
            </HStack>
          </DrawerBody>

          {/* <DrawerFooter></DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </>
  );
};
