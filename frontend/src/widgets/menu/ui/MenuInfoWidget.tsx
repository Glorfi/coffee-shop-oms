import { CategoryClientMenuCard } from '@/entities/category';
import { ICategory } from '@/entities/category/model/types';
import { CategoryMenuCard } from '@/entities/category/ui/CategoryMenuCard';
import { DrinkInfoLine, DrinkMenuLine, IDrink } from '@/entities/drink';
import { useGetCategoriesQuery } from '@/features/category';
import { SelectDrinkDrawer } from '@/features/drink';

import { useAppSelector } from '@/shared/utils/hooks';
import { VStack, useDisclosure, Skeleton, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export const MenuInfoWidget = (): JSX.Element => {
  const { data: categories, isLoading} = useGetCategoriesQuery();
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
      flexGrow={'1'}
    >
      {isLoading
        ? Array.from({ length: 3 }).map((_, index) => (
            <Stack w={'100%'} key={index}>
              <Skeleton height="36px" width={'30%'} />
              <Skeleton height="34px" />
              <Skeleton height="34px" />
            </Stack>
          ))
        : null}
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
