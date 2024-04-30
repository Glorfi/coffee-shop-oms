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
  features?: React.ComponentType<any>[];
}

export const CategoryMenuCard = (props: ICategoryMenuCard): JSX.Element => {
  const { category, lang, features, ...rest } = props;
  const [name, setName] = useState<string>('');
  //const lang = useAppSelector((state) => state.lang);

  useEffect(() => {
    const localCatName = getLocalCategory(category, lang);
    setName(localCatName);
  }, [lang, category]);

  return (
    <VStack
      alignItems={'flex-start'}
      {...rest}
      p={'10px'}
      backgroundColor={'rgba(0 0 0 / 3%)'}
      borderRadius={"10px"}
      backdropFilter={"blur(2px)"}
    >
      <HStack
        alignItems={'baseline'}
        w={'100%'}
        justifyContent={'space-between'}
      >
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
