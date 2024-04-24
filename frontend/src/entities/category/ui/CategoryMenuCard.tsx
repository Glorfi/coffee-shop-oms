import {
  VStack,
  Text,
  StackProps,
  HStack,
  ButtonGroup,
} from '@chakra-ui/react';
import { ICategory } from '../model/types';
import { ReactComponentElement, ReactNode, useEffect, useState } from 'react';
import { useAppSelector } from '@/shared/utils/hooks';
import { getLocalCategory } from '../lib/getLocalCategory';
import { features } from 'process';

interface ICategoryMenuCard extends StackProps {
  category: ICategory;
  children: React.ReactNode;
  lang: 'en' | 'ru' | 'hy';
  features?: React.ComponentType<any>[];
}

export const CategoryMenuCard = (props: ICategoryMenuCard): JSX.Element => {
  const { category, lang, features, ...rest } = props;
  const [name, setName] = useState<string>('');
  //const lang = useAppSelector((state) => state.lang);

  useEffect(() => {
    const localCatName = getLocalCategory(category, lang);
    setName(localCatName);
  }, [lang]);

  return (
    <VStack alignItems={'flex-start'} {...rest}>
      <HStack>
        <Text color={'primary'} fontSize={'xx-large'} fontWeight={'bold'}>
          {name}
        </Text>
        {features ? (
          <ButtonGroup>
            {features.map((Feat, index) => (
              <Feat
                key={`cardfeat${category._id}-${index}`}
                category={category}
              />
            ))}
          </ButtonGroup>
        ) : null}
      </HStack>
      {props.children}
    </VStack>
  );
};
