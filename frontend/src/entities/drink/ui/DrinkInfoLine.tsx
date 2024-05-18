import { VStack, Text, HStack, ButtonGroup } from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { useAppSelector } from '@/shared/utils/hooks';
import { IDrink } from '@/entities/drink';
import { getLocalDrinkInfo } from '../lib/getLocalDrinkInfo';

interface IDrinkInfoLine {
  drink: IDrink;
  lang: 'en' | 'ru' | 'hy';
  features?: React.ComponentType<any>[];
}

export const DrinkInfoLine = (props: IDrinkInfoLine): JSX.Element => {
  const { drink, lang, features } = props;
  const prices = drink.size.map((size) => size.price);
  const pricesString = prices.join('/');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string | undefined>('');
  //const lang = useAppSelector((state) => state.lang);

  useEffect(() => {
    const localDrinkInfo = getLocalDrinkInfo(drink, lang);
    setName(localDrinkInfo.name);
    setDescription(localDrinkInfo.description);
  }, [lang, drink]);

  return (
    <HStack
      key={drink._id}
      width={'100%'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <VStack>
        <Text color={'primary'} fontSize={'md'} fontWeight={'semibold'}>
          {name}
        </Text>
        {description && (
          <Text color={'primary'} fontSize={'md'} fontWeight={'regular'}>
            {description}
          </Text>
        )}
      </VStack>
      <HStack>
        <Text color={'primary'} fontSize={'md'} fontWeight={'semibold'}>
          {`${pricesString} ֏`}{' '}
        </Text>
        {features ? (
          <ButtonGroup>
            {features.map((Feat, index) => (
              <Feat key={`drink${drink._id}-${index}`} drink={drink} />
            ))}
          </ButtonGroup>
        ) : null}
      </HStack>
    </HStack>
  );
};
