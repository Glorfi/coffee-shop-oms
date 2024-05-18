import { addCategoryList } from '@/entities/category';
import { CategoryMenuCard } from '@/entities/category/ui/CategoryMenuCard';
import { IDrink, DrinkInfoLine } from '@/entities/drink';
import {
  CreateCategoryPopUp,
  DeleteCategoryPopUp,
  EditCategoryPopUp,
  useGetCategoriesQuery,
} from '@/features/category';
import {
  CreateDrinkPopUp,
  DeleteDrinkyPopUp,
  EditDrinkPopUp,
} from '@/features/drink';
import { useAppDispatch, useAppSelector } from '@/shared/utils/hooks';
import { Button, ButtonGroup, HStack, VStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

export const MenuAdmindWidget = (): JSX.Element => {
  const { data } = useGetCategoriesQuery();
  const categories = useAppSelector((state) => state.categoryList);
  const dispatch = useAppDispatch();

  const lang = useAppSelector((state) => state.lang.value);
  // const [lang, setLang] = useState<'en' | 'ru' | 'hy'>('ru');

  function rankDrinksByPrice(drinks: IDrink[]) {
    const sortedDrinks = [...drinks];

    sortedDrinks.sort((a, b) => {
      const priceA = a.size.length > 0 ? a.size[0].price : Infinity;
      const priceB = b.size.length > 0 ? b.size[0].price : Infinity;
      return priceA - priceB;
    });

    return sortedDrinks;
  }

  const categoryFeatures = [
    CreateDrinkPopUp,
    EditCategoryPopUp,
    DeleteCategoryPopUp,
  ];

  const drinkFeatures = [EditDrinkPopUp, DeleteDrinkyPopUp];

  useEffect(() => {
    if (data && categories.length === 0) {
      dispatch(addCategoryList(data));
    }
  }, [data]);
  return (
    <VStack
      maxWidth={'1200px'}
      m={'20px auto 0'}
      p={['0 10px', '0 10px', '0 10px', '0 10px']}
      alignItems={'flex-start'}
    >
      <CreateCategoryPopUp />
      <VStack
        alignContent={'flex-start'}
        alignItems={'flex-start'}
        width={'100%'}
        flexWrap={'wrap'}
        gap={'20px'}
        maxH={['unset', 'unset', 'calc(100vh - 64px)', 'calc(100vh-64px)']}
        position={'relative'}
      >
        {categories?.map((cat) => (
          <CategoryMenuCard
            key={cat._id}
            category={cat}
            lang={lang}
            width={'100%'}
            maxW={'400px'}
            features={categoryFeatures}
          >
            {rankDrinksByPrice(cat.drinkList).map((drink) => (
              <DrinkInfoLine
                drink={drink}
                key={drink._id}
                lang={lang}
                features={drinkFeatures}
              />
            ))}
          </CategoryMenuCard>
        ))}
      </VStack>
    </VStack>
  );
};
