import {
  HStack,
  VStack,
  ButtonGroup,
  Text,
  Divider,
  InputRightElement,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { getLocalDrinkInfo } from '../lib/getLocalDrinkInfo';
import { IDrink, ISelectDrink } from '../model/types';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { SIZE, VARIANT } from '../model/locolized-drink-order-titles';

interface IDrinkOrderItem {
  orderItem: ISelectDrink;
  lang: 'en' | 'ru' | 'hy';
  toggleFeature?: React.ComponentType<any>;
  readonly?: boolean;
}

export const DrinkOrderItem = (props: IDrinkOrderItem): JSX.Element => {
  const { orderItem, lang, toggleFeature: ToggleFeature, readonly } = props;

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string | undefined>('');

  useEffect(() => {
    const localDrinkInfo = getLocalDrinkInfo(orderItem.drink, lang);
    setName(localDrinkInfo.name);
    setDescription(localDrinkInfo.description);
  }, [lang, orderItem.drink]);
  return (
    <>
      <HStack
        key={orderItem.drink._id}
        width={'100%'}
        justifyContent={'space-between'}
        alignItems={'center'}
        // backgroundColor={'whiteAlpha.600'}
        p={'5px 0'}
        //  borderRadius={'10'}
      >
        <VStack alignItems={'flex-start'} gap={0}>
          <Text color={'primary'} fontSize={'md'} fontWeight={'bold'}>
            {name}
          </Text>
          <HStack>
            <Text color={'primary'} fontSize={'md'} fontWeight={'semibold'}>
              {`${orderItem.price * orderItem.quantity} ֏`}{' '}
            </Text>
            <Text color={'primary'} fontSize={'sm'} fontWeight={'normal'}>
              {VARIANT[orderItem.variant][lang]}
            </Text>
            <Text color={'primary'} fontSize={'sm'} fontWeight={'normal'}>
              {SIZE[orderItem.size][lang]}
            </Text>
          </HStack>

          {description && (
            <Text color={'primary'} fontSize={'large'} fontWeight={'regular'}>
              {description}
            </Text>
          )}
        </VStack>
        <HStack>
          {ToggleFeature && <ToggleFeature orderItem={orderItem} readonly={readonly} />}
        </HStack>
      </HStack>
      <Divider opacity={1} colorScheme="darkGreen" />
    </>
  );
};
