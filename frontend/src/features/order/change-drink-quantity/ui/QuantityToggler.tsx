import { ISelectDrink } from '@/entities/drink';
import {
  incrementDrinkQuantity,
  decrementDrinkQuantity,
} from '@/entities/order';

import { useAppDispatch, useAppSelector } from '@/shared/utils/hooks';
import {
  InputGroup,
  InputLeftElement,
  IconButton,
  Input,
  InputRightElement,
} from '@chakra-ui/react';
import { FaMinus, FaPlus } from 'react-icons/fa6';

interface IQuantityToggler {
  orderItem: ISelectDrink;
  readonly?: boolean;
}

export const QuantityToggler = (props: IQuantityToggler): JSX.Element => {
  const { orderItem, readonly } = props;
  const state = useAppSelector((state) => state.orderForm);
  const dispatch = useAppDispatch();

  function handleIncrement() {
    dispatch(incrementDrinkQuantity(orderItem));
  }

  function handleDecrement() {
    dispatch(decrementDrinkQuantity(orderItem));
  }

  return (
    <InputGroup maxW={'100px'} border={'none'}>
      {!readonly && (
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
      )}
      <Input
        type="number"
        value={orderItem.quantity}
        textAlign={'center'}
        border={'none'}
        // onChange={handleQuantityInputChange}
        min={1}
        max={10}
        readOnly
      />
      {!readonly && (
        <InputRightElement>
          <IconButton
            aria-label="Search database"
            colorScheme="darkGreen"
            icon={<FaPlus />}
            isRound
            variant={'ghost'}
            onClick={handleIncrement}
            isDisabled={orderItem.quantity === 10}
          />
        </InputRightElement>
      )}
    </InputGroup>
  );
};
