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

  const reduxLang = useAppSelector((state) => state.lang);
  const [lang, setLang] = useState<'en' | 'ru' | 'hy'>('ru');

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
    <>
      <HStack p={'0 20px'} mt={'10px'}>
        <CreateCategoryPopUp />
      </HStack>
      <VStack
        p={'20px'}
        alignContent={'flex-start'}
        alignItems={'flex-start'}
        width={'100%'}
        flexWrap={'wrap'}
        gap={'20px'}
        maxH={['unset', 'unset', 'calc(100vh - 64px)', 'calc(100vh-64px)']}
        position={'relative'}
      >
        <ButtonGroup
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
        </ButtonGroup>
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
    </>
  );
};
