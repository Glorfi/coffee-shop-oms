import { Grid, Text } from '@chakra-ui/react';
import { ISelectDrink } from '../model/types';
import { useEffect, useState } from 'react';
import { getLocalDrinkInfo } from '../lib/getLocalDrinkInfo';
import { SIZE, VARIANT } from '../model/locolized-drink-order-titles';

interface IDrinkOrderAdminItem {
  orderItem: ISelectDrink;
  lang: 'en' | 'ru' | 'hy';
  cardColor: string
  // toggleFeature?: React.ComponentType<any>;
  // readonly?: boolean;
}

export const DrinkOrderItemAdmin = (props: IDrinkOrderAdminItem) => {
  const { orderItem, lang, cardColor } = props;

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string | undefined>('');

  useEffect(() => {
    const localDrinkInfo = getLocalDrinkInfo(orderItem.drink, lang);
    setName(localDrinkInfo.name);
    setDescription(localDrinkInfo.description);
  }, [lang, orderItem.drink]);
  return (
    <Grid
      gap={0}
      templateColumns={'3fr 1fr'}
      bgColor={`${cardColor}.200`}
      p={'10px'}
      w={'100%'}
      borderRadius={10}
    >
      <Text fontSize={'lg'} fontWeight={'bold'} color={'primary'}>
        {name}
      </Text>
      <Text
        fontSize={'lg'}
        fontWeight={'bold'}
        color={'primary'}
        justifySelf={'end'}
      >
        {`x${orderItem.quantity}`}
      </Text>
      <Text
        fontSize={'sm'}
        //  fontWeight={'bold'}
        color={'primary'}
      >
        {`${VARIANT[orderItem.variant][lang]} ${SIZE[orderItem.size][lang]}`}
      </Text>
      <Text
        fontSize={'sm'}
        //  fontWeight={'bold'}
        color={'primary'}
        justifySelf={'end'}
      >
        {`${orderItem.price * orderItem.quantity} ֏`}
      </Text>
    </Grid>
  );
};
