import { CategoryMenuCard } from '@/entities/category/ui/CategoryMenuCard';
import { DrinkInfoLine, IDrink } from '@/entities/drink';
import { useGetCategoriesQuery } from '@/features/category';
import { useAppSelector } from '@/shared/utils/hooks';
import { Box, Grid, HStack, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';

export const MenuInfoWidget = (): JSX.Element => {
  const { data: categories } = useGetCategoriesQuery();

  function rankDrinksByPrice(drinks: IDrink[]) {
    const sortedDrinks = [...drinks];

    sortedDrinks.sort((a, b) => {
      const priceA = a.size.length > 0 ? a.size[0].price : Infinity;
      const priceB = b.size.length > 0 ? b.size[0].price : Infinity;
      return priceA - priceB;
    });

    return sortedDrinks;
  }

  useEffect(() => {
    console.log(categories);
  }, [categories]);
  return (
    <VStack
      p={'20px'}
      alignContent={'flex-start'}
      alignItems={'flex-start'}
      flexWrap={'wrap'}
      gap={'20px'}
      maxH={'100vh'}
    >
      {categories?.map((cat) => (
        <CategoryMenuCard
          key={cat._id}
          category={cat}
          width={'100%'}
          maxW={'400px'}
        >
          {rankDrinksByPrice(cat.drinkList).map((drink) => (
            <DrinkInfoLine drink={drink} key={drink._id} />
          ))}
        </CategoryMenuCard>
      ))}
    </VStack>
  );
};
