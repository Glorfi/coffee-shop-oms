import {
  VStack,
  Text,
  StackProps,
  HStack,
  ButtonGroup,
} from '@chakra-ui/react';
import { ICategory } from '../model/types';
import { useEffect, useState } from 'react';
import { getLocalCategory } from '../lib/getLocalCategory';

interface ICategoryMenuCard extends StackProps {
  category: ICategory;
  children: React.ReactNode;
  lang: 'en' | 'ru' | 'hy';
  // features?: React.ComponentType<any>[];
}

export const CategoryClientMenuCard = (
  props: ICategoryMenuCard
): JSX.Element => {
  const { category, lang, ...rest } = props;
  const [name, setName] = useState<string>('');
  //const lang = useAppSelector((state) => state.lang);

  useEffect(() => {
    const localCatName = getLocalCategory(category, lang);
    setName(localCatName);
  }, [lang, category]);

  return (
    <VStack
      alignItems={'flex-start'}
      w={'100%'}
      borderRadius={'10'}
      backgroundColor={'whiteAlpha.600'}
      backdropFilter={'blur(2px)'}
      p={'5px 10px'}
    >
      <Text color={'darkGreen.500'} fontSize={'2xl'} fontWeight={'bold'}>
        {name}
      </Text>
      {props.children}
    </VStack>
  );
};
