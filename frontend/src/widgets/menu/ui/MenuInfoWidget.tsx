import { CategoryMenuCard } from '@/entities/category/ui/CategoryMenuCard';
import { DrinkInfoLine, IDrink } from '@/entities/drink';
import { useGetCategoriesQuery } from '@/features/category';
import { useAppSelector } from '@/shared/utils/hooks';
import { Button, ButtonGroup, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export const MenuInfoWidget = (): JSX.Element => {
  const { data: categories } = useGetCategoriesQuery();
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

  useEffect(() => {
    console.log(categories);
  }, [categories]);
  return (
    <VStack
      p={'20px'}
      alignContent={'flex-start'}
      alignItems={'flex-start'}
      width={'100%'}
      flexWrap={'wrap'}
      gap={'20px'}
      maxH={['unset', 'unset', '100vh', '100vh']}
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
        >
          {rankDrinksByPrice(cat.drinkList).map((drink) => (
            <DrinkInfoLine drink={drink} key={drink._id} lang={lang} />
          ))}
        </CategoryMenuCard>
      ))}
    </VStack>
  );
};
