import { IDrink, getLocalDrinkInfo } from '@/entities/drink';
import { HotDrinkIcon } from '@/shared/ui/icons/HotDrinkIcon';
import { useAppSelector } from '@/shared/utils/hooks';
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
import React, { ChangeEvent, useEffect, useState } from 'react';
import { FaMinus, FaPlus, FaRegSnowflake } from 'react-icons/fa6';
import { TbFlame } from 'react-icons/tb';
import {
  ADD_TO_CART,
  SIZE,
  SIZE_LARGE,
  SIZE_REGULAR,
  VARIANT,
  VARIANT_COLD,
  VARIANT_HOT,
} from '../model/localized-titles';

interface ISelectDrinkDrawer {
  drink: IDrink;
}

export const SelectDrinkDrawer = (props: ISelectDrinkDrawer): JSX.Element => {
  const { drink } = props;
  const lang = useAppSelector((state) => state.lang.value);
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  const [name, setName] = useState<string>(getLocalDrinkInfo(drink, lang).name);
  //const [variant, setVariant] = useState<string>(getLocalUI(VARIANT, lang));

  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<string>(drink.size[0].price.toString());
  const [selectedDrink, setSelectedDrink] = useState<any>({
    drink: drink._id,
    variant: "",
    size: '',
    quantity: quantity
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
  function handleQuantityInputChange(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);

    if (isNaN(parseInt(e.target.value))) {
      setQuantity(1);
    }
    if (parseInt(e.target.value) > 10) {
      setQuantity(10);
    }
    setQuantity(parseInt(e.target.value));
  }

  useEffect(() => {
    setName(getLocalDrinkInfo(drink, lang).name);
  }, [lang]);

  useEffect(() => {
    !isOpen ? setPrice(drink.size[0].price.toString()) : null;
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
                defaultValue={drink.size[0].price.toString()}
                display={'flex'}
                flexDirection={'column'}
                onChange={setPrice}
              >
                {drink.size.map((size, index) => {
                  if (size.name === 'regular') {
                    return (
                      <Radio
                        key={index}
                        value={size.price.toString()}
                        colorScheme="darkGreen"
                      >
                        {SIZE_REGULAR[lang]}
                      </Radio>
                    );
                  } else if (size.name === 'large') {
                    return (
                      <Radio
                        key={index}
                        value={size.price.toString()}
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
              <Button colorScheme="darkGreen" w={'100%'}>
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

{
  /* <Drawer
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
    <DrawerCloseButton />
    <DrawerHeader>Create your account</DrawerHeader>

    <DrawerBody>
      <Text>Hello Yopta!</Text>
    </DrawerBody>

    <DrawerFooter>
      <Button variant="outline" mr={3} onClick={onClose}>
        Cancel
      </Button>
      <Button colorScheme="blue">Save</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>; */
}
