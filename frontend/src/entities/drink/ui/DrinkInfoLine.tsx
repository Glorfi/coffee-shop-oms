import { VStack, Text, HStack } from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { useAppSelector } from '@/shared/utils/hooks';
import { IDrink } from '@/entities/drink';
import { getLocalDrinkInfo } from '../lib/getLocalDrinkInfo';

interface IDrinkInfoLine {
  drink: IDrink;
}

export const DrinkInfoLine = (props: IDrinkInfoLine): JSX.Element => {
  const { drink } = props;
  const prices = drink.size.map((size) => size.price);
  const pricesString = prices.join('/');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string | undefined>('');
  const lang = useAppSelector((state) => state.lang);

  useEffect(() => {
    const localDrinkInfo = getLocalDrinkInfo(drink, lang);
    setName(localDrinkInfo.name);
    setDescription(localDrinkInfo.description);
  }, [lang]);

  return (
    <HStack
      key={drink._id}
      width={'100%'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <VStack>
        <Text color={'primary'} fontSize={'x-large'} fontWeight={'semibold'}>
          {name}
        </Text>
        {description && (
          <Text color={'primary'} fontSize={'large'} fontWeight={'regular'}>
            {description}
          </Text>
        )}
      </VStack>
      <Text color={'primary'} fontSize={'x-large'} fontWeight={'semibold'}>
        {`${pricesString} ֏`}{' '}
      </Text>
    </HStack>
  );
};
