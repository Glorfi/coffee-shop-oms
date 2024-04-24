import { VStack, Text, StackProps } from '@chakra-ui/react';
import { ICategory } from '../model/types';
import { ReactNode, useEffect, useState } from 'react';
import { useAppSelector } from '@/shared/utils/hooks';
import { getLocalCategory } from '../lib/getLocalCategory';

interface ICategoryMenuCard extends StackProps {
  category: ICategory;
  children: React.ReactNode;
}

export const CategoryMenuCard = (props: ICategoryMenuCard): JSX.Element => {
  const { category, ...rest } = props;
  const [name, setName] = useState<string>('');
  const lang = useAppSelector((state) => state.lang);

  useEffect(() => {
    const localCatName = getLocalCategory(category, lang);
    setName(localCatName);
  }, [lang]);

  return (
    <VStack alignItems={'flex-start'} {...rest}>
      <Text color={'primary'} fontSize={'xx-large'} fontWeight={'bold'}>
        {name}
      </Text>
      {props.children}
    </VStack>
  );
};
