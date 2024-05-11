import { LanguageSwitcher } from '@/shared/ui/languageSwitcher/LanguageSwitcher';
import { useAppSelector } from '@/shared/utils/hooks';
import { SearchIcon } from '@chakra-ui/icons';
import { ButtonGroup, HStack, IconButton, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import {
  HEADER_TITLE_MAIN,
  HEADER_TITLE_ORDER_STATUS,
} from '../model/locolized-titles';
import { useLocation, useNavigation, useParams } from 'react-router-dom';

export const ClientHeader = (): JSX.Element => {
  const [isButtonHovered, setIsButtonHovered] = useState<boolean>(false);
  const lang = useAppSelector((state) => state.lang.value);
  const [headerTitle, setHeaderTitle] = useState<string>('');
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    if (location.pathname.includes('orders')) {
      setHeaderTitle(HEADER_TITLE_ORDER_STATUS[lang]);
    } else {
      setHeaderTitle(HEADER_TITLE_MAIN[lang]);
    }
  }, [location, lang]);
  return (
    <HStack w={'100%'} justifyContent={'space-between'}>
      <Text fontSize={'2xl'} fontWeight={'bold'} color={'primary'}>
        {headerTitle}
      </Text>
      <ButtonGroup alignItems={'center'}>
        <LanguageSwitcher />
        <IconButton
          aria-label="Search database"
          icon={<GiHamburgerMenu color="darkGreen.base" />}
          size={'md'}
          variant={'outline'}
          colorScheme="darkGreen"
          border={'none'}
          // onMouseEnter={() => setIsButtonHovered(true)}
          // onMouseLeave={() => setIsButtonHovered(false)}
        />
      </ButtonGroup>
    </HStack>
  );
};
