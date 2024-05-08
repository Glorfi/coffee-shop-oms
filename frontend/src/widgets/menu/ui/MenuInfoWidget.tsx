import { CategoryClientMenuCard } from '@/entities/category';
import { CategoryMenuCard } from '@/entities/category/ui/CategoryMenuCard';
import { DrinkInfoLine, DrinkMenuLine, IDrink } from '@/entities/drink';
import { useGetCategoriesQuery } from '@/features/category';
import { SelectDrinkDrawer } from '@/features/drink';

import { useAppSelector } from '@/shared/utils/hooks';
import {
  Box,
  Button,
  ButtonGroup,
  VStack,
  Text,
  HStack,
  Slide,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export const MenuInfoWidget = (): JSX.Element => {
  const { data: categories } = useGetCategoriesQuery();
  const lang = useAppSelector((state) => state.lang.value);

  function rankDrinksByPrice(drinks: IDrink[]) {
    const sortedDrinks = [...drinks];

    sortedDrinks.sort((a, b) => {
      const priceA = a.size.length > 0 ? a.size[0].price : Infinity;
      const priceB = b.size.length > 0 ? b.size[0].price : Infinity;
      return priceA - priceB;
    });

    return sortedDrinks;
  }
  const drinkFeatures = [SelectDrinkDrawer];

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  const orderWidget = useDisclosure();
  return (
    <VStack
      alignContent={'flex-start'}
      alignItems={'flex-start'}
      width={'100%'}
      flexWrap={'wrap'}
      gap={'10px'}
      //  maxH={['unset', 'unset', '100vh', '100vh']}
      //position={'relative'}
    >
      {/* <ButtonGroup
        position={'fixed'}
        top={'5'}
        right={'5'}
        backgroundColor={'white'}
      >
        <Button
          size={'xs'}
          onClick={() => setLang('hy')}
          variant={lang === 'hy' ? 'solid' : 'outline'}
        >
          AM
        </Button>
        <Button
          size={'xs'}
          onClick={() => setLang('en')}
          variant={lang === 'en' ? 'solid' : 'outline'}
        >
          EN
        </Button>
        <Button
          size={'xs'}
          onClick={() => setLang('ru')}
          variant={lang === 'ru' ? 'solid' : 'outline'}
        >
          RU
        </Button>
      </ButtonGroup> */}
      {categories?.map((cat) => (
        <CategoryClientMenuCard
          key={cat._id}
          category={cat}
          lang={lang}
          width={'100%'}
          maxW={'400px'}
        >
          {rankDrinksByPrice(cat.drinkList).map((drink) => (
            <DrinkMenuLine
              drink={drink}
              key={drink._id}
              lang={lang}
              features={drinkFeatures}
            />
          ))}
        </CategoryClientMenuCard>
      ))}

      {/* <Button position={'fixed'} onClick={orderWidget.onToggle}>
        CLICKER
      </Button>
      <Slide direction="bottom" in={orderWidget.isOpen} style={{ zIndex: 10 }}>
        <VStack
          backgroundColor={'white'}
          m={0}
          p={'10px 20px'}
          w={'100%'}
          zIndex={5}
          alignItems={'flex-end'}
          borderTopRadius={'md'}
        >
          <HStack justifyContent={'space-between'} w={'100%'}>
            <Text fontWeight={'semibold'} size="md">
              Американо
            </Text>
            <Text fontWeight={'bold'} size="md">
              1000/1200 ֏
            </Text>
          </HStack>
          <Button colorScheme="darkGreen">Добавить в заказ</Button>
        </VStack>
      </Slide> */}
    </VStack>
  );
};
